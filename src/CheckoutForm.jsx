import { Component } from "react";
import NavBar from "./Nav";
import { Link } from "react-router-dom";

class CheckoutForm extends Component {
    state = {
        orderInfo: [],
        totalPrice: 0,
        fName: "",
        mName: "",
        lName: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        USstate: "OR",
        zip: "",
        time: null,
        success: false
    }

    render() {
        return (
            <>
                <NavBar />
                <div className="checkout-div">
                    <h4>Customer Details</h4>
                    <br></br>
                    <form className="row g-3 needs-validation" >
                        <div className="col-md-4">
                            <label className="form-label">First name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="John"
                                onChange={this.setFName}
                                required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Middle name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="(optional)"
                                onChange={this.setMName}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Last name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Doe"
                                onChange={this.setLName}
                                required />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="name@example.com"
                                onChange={this.setEmail}
                                required />
                        </div>
                        <div className="col-md-12">
                            <label className="phone-input">Phone number:</label>
                            <input
                                className="form-control"
                                placeholder="999-999-9999"
                                type="tel"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                onChange={this.setPhone}
                                required
                            />
                        </div>
                        {this.formOnDelivery()}
                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" required />
                                <label className="form-check-label">
                                    <span>I agree to allow A la Cart to charge my card for $</span>
                                    <span>{this.state.totalPrice === 0 ? "loading..." : this.state.totalPrice}</span>
                                </label>

                            </div>
                        </div>
                        <div className="col-12">
                            <Link className="btn nav-link active" to="/stripeInfo"><button className="btn btn-primary" type="submit" onClick={this.pay}>Payment</button></Link>
                            <Link className="btn nav-link active" to="/cart" onClick={this.deleteCheckout}><button className="btn btn-danger" type="button">Return to Cart</button></Link>
                        </div>
                    </form>
                </div>
            </>
        )
    }
    // to set first name
    setFName = (event) => {
        this.setState({
            fName: event.target.value
        })
    }

    // to set middle name
    setMName = (event) => {
        this.setState({
            mName: event.target.value
        })
    }

    // to set last name
    setLName = (event) => {
        this.setState({
            lName: event.target.value
        })
    }

    // to set email
    setEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    // to set phone number
    setPhone = (event) => {
        this.setState({
            phone: event.target.value
        })
    }

    formOnDelivery = () => {
        // to allow for state to be set
        if (this.state.orderInfo[0] === undefined) {
            return null;
        }
        else if (this.state.orderInfo[0].fees === 8) {
            return (

                <>
                    <label className="form-label">Delivery Address</label>
                    <div className="col-md-12">
                        <label className="form-label">Street</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="123 Hungry Street"
                            onChange={this.setStreet}
                            required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">City</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Portland"
                            onChange={this.setCity}
                            required />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">State</label>
                        <select
                            defaultValue="OR"
                            className="form-select"
                            onChange={this.setUSState}
                            required>
                            <option value="AK">AK</option>
                            <option value="AL">AL</option>
                            <option value="AR">AR</option>
                            <option value="AZ">AZ</option>
                            <option value="CA">CA</option>
                            <option value="CO">CO</option>
                            <option value="CT">CT</option>
                            <option value="DC">DC</option>
                            <option value="DE">DE</option>
                            <option value="FL">FL</option>
                            <option value="GA">GA</option>
                            <option value="HI">HI</option>
                            <option value="IA">IA</option>
                            <option value="ID">ID</option>
                            <option value="IL">IL</option>
                            <option value="IN">IN</option>
                            <option value="KS">KS</option>
                            <option value="KY">KY</option>
                            <option value="LA">LA</option>
                            <option value="MA">MA</option>
                            <option value="MD">MD</option>
                            <option value="ME">ME</option>
                            <option value="MI">MI</option>
                            <option value="MN">MN</option>
                            <option value="MO">MO</option>
                            <option value="MS">MS</option>
                            <option value="MT">MT</option>
                            <option value="NC">NC</option>
                            <option value="ND">ND</option>
                            <option value="NE">NE</option>
                            <option value="NH">NH</option>
                            <option value="NJ">NJ</option>
                            <option value="NM">NM</option>
                            <option value="NV">NV</option>
                            <option value="NY">NY</option>
                            <option value="OH">OH</option>
                            <option value="OK">OK</option>
                            <option value="OR">OR</option>
                            <option value="PA">PA</option>
                            <option value="RI">RI</option>
                            <option value="SC">SC</option>
                            <option value="SD">SD</option>
                            <option value="TN">TN</option>
                            <option value="TX">TX</option>
                            <option value="UT">UT</option>
                            <option value="VA">VA</option>
                            <option value="VT">VT</option>
                            <option value="WA">WA</option>
                            <option value="WI">WI</option>
                            <option value="WV">WV</option>
                            <option value="WY">WY</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Zip</label>
                        <input
                            type="text"
                            placeholder="99999"
                            className="form-control"
                            pattern="[0-9]{5}"
                            onChange={this.setZip}
                            required />
                    </div>
                </>)
        }
    }

    // to set street
    setStreet = (event) => {
        this.setState({
            street: event.target.value
        })
    }

    // to set city
    setCity = (event) => {
        this.setState({
            city: event.target.value
        })
    }

    // to set US state
    setUSState = (event) => {
        this.setState({
            USstate: event.target.value
        })
    }

    // to set zip
    setZip = (event) => {
        this.setState({
            zip: event.target.value
        })
    }



    // delete checkout items when returning to cart
    deleteCheckout = () => {
        fetch(`http://localhost:5000/Checkout/1`,
            { method: "DELETE" }
        )
        this.setState({
            fromCart: null
        })
    }

    calculateTotalPrice = () => {
        if (this.state.orderInfo[0] === undefined) {
            this.setState({
                totalPrice: 0
            })
        }
        else {
            let totalPrice = this.state.orderInfo[0].totalPrice + this.state.orderInfo[0].fees;
            this.setState({
                totalPrice: totalPrice
            })
            return (
                totalPrice
            )
        }
    }

    // checks to see if component mounts then make HTTP requests
    componentDidMount = () => {
        // sets timeout to ensure post request is settled
        setTimeout(() => {
            // get request from database server
            fetch(" http://localhost:5000/checkout", { method: "GET" })
                .then(response => response.json())
                .then(data => this.setState({
                    orderInfo: data
                }))
        }, 100)
        // sets timeout on total price to ensure state is 
        setTimeout(() => {
            this.calculateTotalPrice()
            this.formOnDelivery()
        }, 1000)
    }
}

export default CheckoutForm