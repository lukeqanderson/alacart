import { Component } from "react";
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import NavCheckout from "./NavCheckout";
import { Link } from "react-router-dom";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51KTfEKGcuciBY4Okf6HKLykrigDKlBErDt09UasA4Wm6THkHcRM82hgSHVm7u9U54UHEJH2DCP5fPV1UmKlduAmv00yLCdXCmc'
);

class Checkout extends Component {
    state = {
        fromCart: [],
        totalPrice: 0,
        fName: "",
        lName: "",
        streetAddr: "",
        city: "",
        state: "",
        zipcode: "",
        deliveryStreetAddr: "",
        deliveryCity: "",
        deliveryState: "",
        deliveryZipcode: "",
        // to indicate successful payment
        success: false
    }
    render() {
        return (
            <>
                <NavCheckout />
                <Elements stripe={stripePromise}>
                    <div className="checkout-div">
                        <form className="row g-3 needs-validation" novalidate>
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
                            <label className="form-label">Billing Address</label>
                            <div className="col-md-12">
                                <label className="form-label">Street</label>
                                <input type="text" className="form-control" required />
                                <div class="invalid-feedback">
                                    Please provide a valid street.
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="validationCustom03" class="form-label">City</label>
                                <input type="text" class="form-control" id="validationCustom03" required />
                                <div class="invalid-feedback">
                                    Please provide a valid city.
                                </div>
                            </div>
                            <div class="col-md-3">
                                <label for="validationCustom04" class="form-label">State</label>
                                <select class="form-select" id="validationCustom04" required>
                                    <option selected disabled value="">Choose...</option>
                                    <option>...</option>
                                </select>
                                <div class="invalid-feedback">
                                    Please select a valid state.
                                </div>
                            </div>
                            <div class="col-md-3">
                                <label for="validationCustom05" class="form-label">Zip</label>
                                <input type="text" class="form-control" id="validationCustom05" required />
                                <div class="invalid-feedback">
                                    Please provide a valid zip.
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                                    <label class="form-check-label" for="invalidCheck">
                                        Agree to terms and conditions
                                    </label>
                                    <div class="invalid-feedback">
                                        You must agree before submitting.
                                    </div>
                                </div>
                            </div>
                            {/* {this.formOnDelivery()} */}

                            <CardElement></CardElement>
                            <div class="col-12">
                                <button class="btn btn-primary" type="button">Pay now</button>
                                <Link className="nav-link active" to="/cart" onClick={this.deleteCheckout}><button class="btn btn-danger" type="button">Return to Cart</button></Link>
                            </div>
                        </form>
                    </div>
                </Elements>
            </>
        );
    }

    // delete checkout items when returning to cart
    deleteCheckout = () => {
        fetch(`http://localhost:5000/Checkout/1`,
            { method: "DELETE" }
        )
    }

    // renders delivery address form if form is delivery
    formOnDelivery = () => {
        if (this.state.fromCart[0]) {
            return (<form className="row g-3 needs-validation" novalidate>
                <label className="form-label"> Address</label>
                <div className="col-md-12">
                    <label className="form-label">Street</label>
                    <input type="text" className="form-control" required />
                    <div class="invalid-feedback">
                        Please provide a valid street.
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="validationCustom03" class="form-label">City</label>
                    <input type="text" class="form-control" id="validationCustom03" required />
                    <div class="invalid-feedback">
                        Please provide a valid city.
                    </div>
                </div>
                <div class="col-md-3">
                    <label for="validationCustom04" class="form-label">State</label>
                    <select class="form-select" id="validationCustom04" required>
                        <option selected disabled value="">Choose...</option>
                        <option>...</option>
                    </select>
                    <div class="invalid-feedback">
                        Please select a valid state.
                    </div>
                </div>
                <div class="col-md-3">
                    <label for="validationCustom05" class="form-label">Zip</label>
                    <input type="text" class="form-control" id="validationCustom05" required />
                    <div class="invalid-feedback">
                        Please provide a valid zip.
                    </div>
                </div>
            </form>)
        }
    }

    // checks to see if component mounts then make HTTP requests
    componentDidMount = async () => {
        // get request from database server
        let response = await fetch(" http://localhost:5000/checkout", { method: "GET" })
        // converts the json data to js array
        let fromCart = await response.json();
        // sets the state to fetched values
        this.setState({ fromCart: fromCart });
    }
};

export default Checkout