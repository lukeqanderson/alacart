import { Component } from "react";
import NavLogin from "./NavLogin";
import { Navigate } from "react-router-dom";

class Login extends Component {
    // sets state of login fields
    state = {
        email: "",
        password: "",
        isRestaurant: false,
        validUsers: []
    }
    render() {
        return (
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
                            type="submit"
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

    login = () => {
        for (let i = 0; i < this.state.validUsers.length; i++) {

            // checks for verification of login credentials for customer
            if (this.state.validUsers[i].password === this.state.password
                & this.state.validUsers[i].email === this.state.email
                & this.state.validUsers[i].isRestaurant === false) {
                alert("yep");
                < Navigate to="/home" />
            }
            // checks credentials for restaurant
            else if (this.state.validUsers[i].password === this.state.password
                & this.state.validUsers[i].email === this.state.email
                & this.state.validUsers[i].isRestaurant === true) {
                alert("YUP!");
                < Navigate to="/orders" />
            }
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
        console.log(this.state.validUsers);
        alert(this.state.validUsers);
    }
}

export default Login;