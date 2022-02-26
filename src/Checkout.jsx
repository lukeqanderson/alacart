import { data } from "jquery";
import { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "./Nav";


class Checkout extends Component {
    state = {
        fromCart: [],
        totalPrice: 0,
        fees: 0,
        orderOption: false,
        buttonStylePickup: "btn btn-secondary",
        buttonStyleDelivery: "btn btn-secondary",
        checkoutLink: "/checkout",
        checkBug: null
    }
    render() {
        return (
            <div className="order-review-div">
                <NavBar />
                <div className="checkout-div">
                    <h4>Your Order</h4>
                    <table className="order-details">
                        <tbody>
                            <tr>
                                <th><strong>Name</strong></th>
                                <th className="item-table-item"><strong>Size</strong></th>
                                <th className="item-table-item"><strong>Add-ons</strong></th>
                                <th className="item-table-item"><strong>Notes</strong></th>
                                <th className="item-table-item"><strong>Quantity</strong></th>
                                <th className="item-table-item"><strong>Price</strong></th>
                            </tr>
                            {this.state.fromCart.map((item) => {
                                return (this.generateFoodRow(item))
                            })}
                        </tbody>
                    </table>
                    <table className="price-table">
                        <tbody>
                            <tr>
                                <td><h5>Order Price:</h5></td>
                                <td className="price-data"><h5>${this.calculateTotalPrice(this.state.fromCart)}</h5></td>

                            </tr>
                            <tr>
                                <td><h5>+ Fees:</h5></td>
                                <td className="price-data"><h5>${this.state.fees}</h5></td>
                            </tr>
                            <tr>
                                <td><h5><strong>Total Price:</strong></h5></td>
                                <td className="price-data"><h5><strong>${this.increaseTotalPrice(this.state.fees)}</strong></h5></td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="options-text">Please select either pick-up or deliver below</p>
                    <button className={"pickup-btn " + this.state.buttonStylePickup} onClick={this.orderPickup}>Pick-up</button>
                    <button className={"delivery-btn " + this.state.buttonStyleDelivery} onClick={this.orderDelivery}>Delivery + $8</button>
                    <p className="options-text">Please review your order carefully. To make any changes click the "Cart" button to go back.</p>
                    <p className="options-text">Otherwise, hit "Continue" to proceed to payment.</p>
                    <Link className="btn" to="/cart" onClick={this.deleteCheckout}><button className="btn btn-danger" type="button">Cart</button></Link>
                    <Link className="btn" to={this.state.checkoutLink} onClick={this.sendCheckout}><button className="btn btn-primary" type="button">Continue</button></Link>
                </div>
            </div >
        );
    }

    // method to send info to checkout db
    sendCheckout = () => {
        // checks for pick-up or delivery selection
        if (!this.state.orderOption) {
            alert("You must select an order option before continuing.")
        }
        else {
            fetch(`http://localhost:5000/Checkout`, {
                method: 'POST',
                headers: {
                    'Accepts': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
        }
    }

    // method for ordering pickup
    orderPickup = () => {
        // checks for selected buttons
        if (this.state.fees === 0 & this.state.orderOption === false) {
            this.setState({
                buttonStylePickup: "btn btn-success"
            })
            this.setState({
                orderOption: true
            })
            this.setState({
                checkoutLink: "/checkoutform"
            })
        }
        else if (this.state.fees !== 0) {
            this.setState({
                fees: 0
            })
            this.setState({
                buttonStyleDelivery: "btn btn-secondary"
            })
            this.setState({
                buttonStylePickup: "btn btn-success"
            })
        }
    }

    // method for ordering delivery
    orderDelivery = () => {
        // checks for selected buttons
        if (this.state.fees === 0 & this.state.orderOption === false) {
            this.setState({
                fees: 8
            })
            this.setState({
                buttonStyleDelivery: "btn btn-success"
            })
            this.setState({
                orderOption: true
            })
            this.setState({
                checkoutLink: "/checkoutform"
            })
        }
        else if (this.state.fees !== 8) {
            this.setState({
                fees: 8
            })
            this.setState({
                buttonStyleDelivery: "btn btn-success"
            })
            this.setState({
                buttonStylePickup: "btn btn-secondary"
            })
        }
    }

    // method to generate a table row of food items and details
    generateFoodRow = (item) => {
        return (
            <tr key={item.id}>
                <td>{item.name}</td>
                <td className="item-table-item">{item.size.substr(0, item.size.indexOf(","))}</td>
                <td className="item-table-item">
                    {item.toppings[0]
                        ? item.toppings.map((topping) => {
                            return <li key={topping[1]} className="topping-list-item">{topping}</li>
                        })
                        // retruns "None." of there are no items in the array
                        : <span> None. </span>}
                </td>
                <td className="item-table-item">{item.notes}</td>
                <td className="item-table-item">{item.quantity}</td>
                <td className="item-table-item">${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
            </tr >
        )
    }

    // increase total price
    increaseTotalPrice = (amt) => {
        return (this.state.totalPrice + amt);
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

    // method to calculate total price
    calculateTotalPrice = (menu) => {
        let totalPrice = 0;
        // loops through the menu
        for (let i = 0; i < menu.length; i++) {
            totalPrice += menu[i].price * menu[i].quantity;
        }
        totalPrice = totalPrice.toFixed(2);
        return (parseFloat(totalPrice));
    }

    // clear checkout if applicable
    // bug fix for is user render the checkout page after loading checkoutform page
    // adds multiple items to the db causing website failure
    clearCheckoutBugFix = () => {
        // get request from database server
        fetch(" http://localhost:5000/checkout", { method: "GET" })
            .then(response => response.json())
            .then(data => this.setState({
                checkBug: data
            }))

        // set timeout for GET request to process
        setTimeout(() => {
            let i = this.state.checkBug.length - 1;
            let bugData = this.state.checkBug;
            // while loop to check for additional data
            while (bugData | bugData[i] != undefined) {
                let id = bugData[i].id;
                // deletes the data
                fetch(`http://localhost:5000/Checkout/${id}`,
                    { method: "DELETE" }
                )
                i--;
            }
        }, 500)
    }

    // checks to see if component mounts then make HTTP requests
    componentDidMount = async () => {
        this.clearCheckoutBugFix();
        // get request from database server
        let response = await fetch(" http://localhost:5000/cart", { method: "GET" })
        // converts the json data to js array
        let fromCart = await response.json();
        this.setState({
            fromCart: fromCart
        })
        this.setState({
            totalPrice: this.calculateTotalPrice(fromCart)
        })
    }
};

export default Checkout