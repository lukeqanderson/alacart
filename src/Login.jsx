import { Component } from "react";
import NavLogin from "./NavLogin";
import Home from "./Home";
import Orders from "./Orders";
import Cart from "./Cart";
import Menu from "./Menu";
import Checkout from "./Checkout";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// for routing
import { Route, Routes } from "react-router-dom";
import { DateTime } from "luxon";

const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_KEY);

class Login extends Component {
    // sets state of login fields
    state = {
        email: "",
        password: "",
        isRestaurant: false,
        validUsers: [],
        userValidCustomer: false,
        userValidRestaurant: false,
        currentTimeHours: null,
        isLoggedInCustomer: false,
        isLoggedInRestaurant: false
    }


    render() {
        if (this.state.userValidCustomer === false & this.state.userValidRestaurant === false & this.state.isLoggedInCustomer === false & this.state.isLoggedInRestaurant === false) {
            return (
                // renders login page for not authenticated
                <>
                    {/* render navbar for login */}
                    <NavLogin />
                    <div className="login-div">
                        {/* creates bootstrap login form */}
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    // sets value to the email state
                                    value={this.state.email}
                                    // sets the state to change on event listener
                                    onChange={(event) => {
                                        this.setState({ email: event.target.value })
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    // sets value to the password state
                                    value={this.state.password}
                                    // sets the state to change on event listener
                                    onChange={(event) => {
                                        this.setState({ password: event.target.value })
                                    }}
                                />
                            </div>
                            {this.state.message}
                            <br className="login-break"></br>
                            <button
                                type="button"
                                className="btn btn-primary"
                                // when user clicks it executes the login method
                                onClick={this.login}>
                                Login
                            </button>
                        </form>
                    </div>
                </>

            )
        }
        else if (this.state.userValidCustomer === true | this.state.isLoggedInCustomer === true) {
            // routes pages for customer
            return (
                <Routes>
                    <Route path="/menu" exact element={<Menu />} />
                    <Route path="/cart" exact element={<Cart />} />
                    <Route path="/home" exact element={<Home />} />
                    <Route path="/checkout" exact element={<Checkout />} />
                    {this.renderCheckoutForm()}
                    <Route path="*" element={<Home />} />
                </Routes>
            )
        }
        else {
            return (
                // routes orders page for restaurant
                <Routes>
                    <Route path="*" element={<Orders />} />
                </Routes>
            )
        }
    }

    // 

    // method to validate login
    login = () => {
        for (let i = 0; i < this.state.validUsers.length; i++) {

            // checks for verification of login credentials for customer
            if (this.state.validUsers[i].password === this.state.password
                & this.state.validUsers[i].email === this.state.email
                & this.state.validUsers[i].isRestaurant === false) {
                this.setState({ userValidCustomer: true });
                // updates database for logged in customer
                fetch(`http://localhost:5000/Users/1`,
                    {
                        method: "PATCH",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ "isLoggedIn": true })
                    }
                )
            }
            // checks credentials for restaurant
            else if (this.state.validUsers[i].password === this.state.password
                & this.state.validUsers[i].email === this.state.email
                & this.state.validUsers[i].isRestaurant === true) {
                this.setState({ userValidRestaurant: true });
                // updates database for logged in restaurant
                fetch(`http://localhost:5000/Users/2`,
                    {
                        method: "PATCH",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ "isLoggedIn": true })
                    }
                )
            }
        }
    }

    // method to check for logged in user
    checkLoggedIn = () => {
        for (let i = 0; i < this.state.validUsers.length; i++) {
            if (this.state.validUsers[i].isRestaurant === false & this.state.validUsers[i].isLoggedIn === true) {
                this.setState({ isLoggedInCustomer: true })
            }
            else if (this.state.validUsers[i].isLoggedIn === true) {
                this.setState({ isLoggedInRestaurant: true })
            }
        }
    }

    // method to set current time
    setTime = () => {
        // gets US Pacific time
        const zone = "America/Los_Angeles"
        const time = DateTime.now().setZone(zone).hour;
        this.setState({
            currentTimeHours: time
        })
    }

    // method to render checkout form options on open time
    renderCheckoutForm = () => {
        if (this.state.currentTimeHours >= 0 & this.state.currentTimeHours < 24) {
            return (
                <Route path="/checkoutform" exact element={<Elements stripe={stripePromise}><CheckoutForm /></Elements>} />
            )
        }
    }

    // to pull data from users database to state
    componentWillMount = async () => {
        // get request from database server
        let response = await fetch(" http://localhost:5000/Users", { method: "GET" })
        // converts the json data to js array
        let users = await response.json();
        // sets the state to fetched values
        this.setState({ validUsers: users });
        // checks for logged in users
        this.checkLoggedIn();
        // sets current time
        this.setTime();
    }
}

export default Login;