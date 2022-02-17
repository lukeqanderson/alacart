import { Component } from "react";
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import NavCheckout from "./NavCheckout";
import { Link } from "react-router-dom";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51KTfEKGcuciBY4Okf6HKLykrigDKlBErDt09UasA4Wm6THkHcRM82hgSHVm7u9U54UHEJH2DCP5fPV1UmKlduAmv00yLCdXCmc'
);

class CheckoutForm extends Component {
    state = {
        orderInfo: [],
        totalPrice: 0,
        fName: "",
        mName: "",
        lName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        success: false,
        bugData: null
    }
    render() {
        return (
            <>
                <NavCheckout />
                <Elements stripe={stripePromise}>
                    <div className="checkout-div">
                        <h4>Billing Information</h4>
                        <br></br>
                        <form className="row g-3 needs-validation" noValidate>
                            <div className="col-md-4">
                                <label className="form-label">First name</label>
                                <input type="text" className="form-control" required />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Middle name</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Last name</label>
                                <input type="text" className="form-control" required />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">Email address</label>
                                <input type="email" className="form-control" placeholder="name@example.com"></input>
                            </div>

                            {this.formOnDelivery()}
                            <label className="form-label">Card Information</label>
                            <CardElement></CardElement>
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
                                <button className="btn btn-primary" type="submit">Pay now</button>
                                <Link className="btn nav-link active" to="/cart" onClick={this.deleteCheckout}><button className="btn btn-danger" type="button">Return to Cart</button></Link>
                            </div>
                        </form>
                    </div>
                </Elements>
            </>
        )
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
                        <input type="text" className="form-control" required />
                        <div className="invalid-feedback">
                            Please provide a valid street.
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">City</label>
                        <input type="text" className="form-control" required />
                        <div className="invalid-feedback">
                            Please provide a valid city.
                        </div>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">State</label>
                        <select defaultValue="OR" className="form-select" required>
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
                        <div className="invalid-feedback">
                            Please select a valid state.
                        </div>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Zip</label>
                        <input type="text" className="form-control" required />
                        <div className="invalid-feedback">
                            Please provide a valid zip.
                        </div>
                    </div>
                </>)
        }
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