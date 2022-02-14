import { Component } from "react";
import CartItem from "./CartItem";
import NavBar from "./Nav";

class Cart extends Component {
    //Creates the menu as part of the state in base for (no add-ons)
    state = {
        menu: [],
        cartTotal: 0
    }


    // method to delete item from the list
    deleteItem = (index) => {
        // removes item
        this.state.menu.splice(index, 1);
        //resets the state
        this.setState({ menu: this.state.menu });
    }

    render() {
        // renders empty cart message when no more items
        if (this.state.menu.length === 0) {
            return (
                <>
                    {/* render customer  navbar */}
                    <NavBar cartTotal={this.state.cartTotal}></NavBar>
                    <div>
                        <h4 className="empty-cart-message">Cart is empty. Click on the Menu tab to add items!</h4>
                    </div>
                </>
            )
        }
        else {
            return (
                // render customer navbar
                <>
                    {/* passes calculate cart total to NavBar */}
                    <NavBar cartTotal={this.state.cartTotal}></NavBar>
                    <div className="cart-div">
                        <h4>Cart</h4>
                        <div className="item-grid">
                            {/* loops the array to return elements */}
                            {this.state.menu.map((item, index) => {
                                //renders the item as a MenuItem component and passes in props
                                return (<CartItem
                                    key={item.id}
                                    item={item}
                                    // methods passed as props for increase and decreasing the quantity
                                    increaseQuantity={this.increaseQuantity}
                                    decreaseQuantity={this.decreaseQuantity}>
                                    {/* passes a button to the child component */}
                                    <button className="btn btn-danger" onClick={() => { this.deleteItem(index) }}>Remove</button>
                                </CartItem>);
                            })}
                        </div>
                        <div className="total-price-div">
                            <h1>Total: ${this.calculateTotalPrice(this.state.menu)}</h1>
                        </div>
                        <div className="checkout-div">
                            <button className="pickup-btn btn btn-primary">Order Pick-up (free)</button>
                            <button className="delivery-btn btn btn-primary">Order Delivery (+ $8.00)</button>
                        </div>
                        <h1>{this.state.cartTotal}</h1>
                    </div>
                </>
            )
        }
    }

    // method to increase quantity
    increaseQuantity = (item) => {
        //if statement to limited quantity to 50
        if (item.quantity < 50) {
            //clones all items into array to faciliate changing state
            let menu = [...this.state.menu];
            // find index of the targeted item in new array
            let index = menu.indexOf(item);
            // increments new array at index
            menu[index].quantity++;
            // updates to state
            this.setState({ menu: menu })
        }
        this.calculateCartTotal();
    }

    // method to decrease quantity
    decreaseQuantity = (item) => {
        // if statement to only decriment if more than 1 item
        if (item.quantity > 1) {
            //clones all items into array to faciliate changing state
            let menu = [...this.state.menu];
            // find index of the targeted item in new array
            let index = menu.indexOf(item);
            // decrements new array at index
            menu[index].quantity--;
            // updates to state
            this.setState({ menu: menu })
        }
        this.calculateCartTotal();
    }

    // method to calculate total price
    calculateTotalPrice = (menu) => {
        let totalPrice = 0;
        // loops through the menu
        for (let i = 0; i < menu.length; i++) {
            totalPrice += menu[i].price * menu[i].quantity;
        }
        // returns rounded to 2 decimal places
        return totalPrice.toFixed(2);
    }

    // to pull data from database to state
    componentWillMount = async () => {
        // get request from database server
        let response = await fetch(" http://localhost:5000/Cart", { method: "GET" })
        // converts the json data to js array
        let menu = await response.json();
        // sets the state to fetched values
        this.setState({ menu: menu });
        // calculates the cart total
        this.calculateCartTotal();
    }

    // method to calculate amount of items in cart
    calculateCartTotal = () => {
        let total = 0;
        // goes through each item in the menu state to calculate total
        for (let i = 0; i < this.state.menu.length; i++) {
            total += parseInt(this.state.menu[i].quantity);
        }

        // sets state to cart total
        this.setState({
            cartTotal: total
        })
    }
}

export default Cart;