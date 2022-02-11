import { Component } from "react";
import CartItem from "./CartItem";

class Cart extends Component {
    //Creates the menu as part of the state in base for (no add-ons)
    state = {
        menu: [
            {
                id: 1,
                image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.2rjuctA82u1FTqLlyGJmogHaEK%26pid%3DApi&f=1",
                name: "Pizza",
                description: "Fresh from the oven!",
                size: "Small",
                // second value in toppings is the key
                toppings: [["extra cheese", 0], ["pepperoni", 1], ["onion", 2]],
                price: 18.99,
                quantity: 3
            },
            {
                id: 2,
                image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.G13rEy-90dsbrAVFBL2MQwHaFj%26pid%3DApi&f=1",
                name: "Salad",
                description: "Fresh and crisp garden salad!",
                size: "Small",
                toppings: [],
                price: 10.99,
                quantity: 2
            },
            {
                id: 3,
                image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ZmLZZboWmuX2ZyGQLHFOwQHaD5%26pid%3DApi&f=1",
                name: "Wings",
                description: "Our famous Buffalo style hot wings!",
                size: "Medium",
                toppings: [["blue cheese", 3]],
                price: 12.99,
                quantity: 1
            },
        ]
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
                <div>
                    <h4 className="empty-cart-message">Cart is empty. Click on the Menu tab to add items!</h4>
                </div>
            )
        }
        else {
            return (
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
                </div>
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
}

export default Cart;