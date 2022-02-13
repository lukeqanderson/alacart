import { Component } from "react";

//component for a single product
class MenuItem extends Component {

    //adds the props to state so they can be changed
    state = {
        item: this.props.item,
        //stores an item to send to cart
        toCart: {

            id: this.props.item.id,
            image: this.props.item.image,
            name: this.props.item.name,
            description: this.props.item.description,
            size: "",
            // second value in toppings is the key
            toppings: [],
            price: this.props.item.price,
            quantity: 0,
        },
        cartItem: []
    };

    render() {
        return (
            //supplies all properties from parent element "Cart"
            //as props
            <div className="card item-card">
                <img src={this.state.item.image} className="card-img-top item-image" alt={this.state.item.name} />
                <div className="card-body">
                    <div className="title-price-div">
                        <h5 className="card-title">{this.state.item.name}
                            <span className="item-price">${this.state.item.price}</span></h5>
                        <p>{this.state.item.description}</p>
                    </div>
                    {/* form for user inputs from menu */}
                    <form>

                        <div className="form-group">
                            <label
                                className="quantity-label"
                                htmlFor="quantity-input">Quantity
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="quantity-input"
                                min="0"
                                max="50"
                                placeholder="Enter the amount..."
                                value={this.state.quantity}
                                // method to update quantity on change
                                onChange={this.updateQuantity}
                            />
                            <select className="size-select form-select" aria-label="Default select example" onChange={this.updateSize}>
                                <option>Pick a size...</option>
                                {/* loops the array to return the sizes */}
                                {this.state.item.size.map((size) => {
                                    // if statement to display addition information and added price
                                    return (size[3] | size[3] === 0
                                        ? <option key={size[1]} value={size}>
                                            {size[0]} ({size[2]}) + ${size[3]}
                                        </option>
                                        : <option key={size[1]} value={size}>
                                            {size[0]}
                                            + ${size[2]}
                                        </option>)
                                })}
                            </select>
                        </div>
                        {/* loops the array to return toppings */}
                        {this.state.item.toppings.map((topping) => {
                            //renders the toppings in checkbox form
                            return (
                                <div key={topping[1]} className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="add-on"
                                        // sets value to the toppings array
                                        value={topping}
                                        onChange={this.updateToppings}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="add-on">
                                        Add {topping[0]} ${topping[2].toFixed(2)}
                                    </label>
                                </div>
                            );
                        })}
                        <button type="submit" className="add-to-cart-btn btn btn-primary" onClick={this.addItems}>Add to Cart</button>
                    </form>
                </div >
            </div >
        )
    }

    // method to update quantity state in toCart on change
    updateQuantity = (event) => {
        this.setState(
            {
                toCart: {
                    ...this.state.toCart,
                    quantity: event.target.value
                }
            }
        )
    }

    // method to update toppings on change
    updateToppings = (event) => {
        // add toppings name to the state
        this.setState({
            cartItem: this.state.cartItem.concat(event.target.value.substr(0, event.target.value.indexOf(",")))
        })
    }

    // method to update size state in toCart on change
    updateSize = (event) => {
        // sets cart to value of size selected
        this.setState(
            {
                toCart: {
                    ...this.state.toCart,
                    size: event.target.value
                }
            }
        )
    }

    // method to determine if toppings is selected or not and return them
    returnSelectedToppings = () => {
        if (this.state.cartItem.length === 0) {
            return this.state.cartItem;
        }
        else {
            //return the toppings with no duplicates
            let toppingsNoDuplicate = [...new Set(this.state.cartItem)];
            // for loops to counts array items and remove item with a count dividable by 2
            for (let i = 0; i < toppingsNoDuplicate.length; i++) {
                let toppingCount = 0;
                for (let u = 0; u < this.state.cartItem.length; u++) {
                    if (toppingsNoDuplicate[i] === this.state.cartItem[u]) {
                        toppingCount++;
                    }
                }
                if (toppingCount % 2 === 0) {
                    toppingsNoDuplicate.splice(i, i + 1);
                }
            }
            return toppingsNoDuplicate;
        }
    }

    //method to update price in state
    updatePrice = () => {
        // sets updated price to new price
        let updatedPrice = this.state.toCart.price;


        // sets updates price of size by targeting last character of string
        updatedPrice = updatedPrice + parseInt(this.state.toCart.size.slice(-1));

        // for loop to go through item and add topping prices
        for (let i = 0; i < this.state.item.toppings.length; i++) {
            // for loop to go through toppings chosen
            for (let u = 0; u < this.state.toCart.toppings.length; u++) {
                // if statement to check for corrent toppings
                if (this.state.item.toppings[i][0] === this.state.toCart.toppings[u]) {
                    updatedPrice += this.state.item.toppings[i][2];
                }
            }
        }

        //multiplies for quantity
        updatedPrice *= this.state.toCart.quantity;

        this.setState({
            toCart: {
                ...this.state.toCart,
                price: updatedPrice
            }
        }, this.sendItems)
    }

    //method to send items to database
    sendItems = () => {
        //converts cart state to json string
        const sendToCart = JSON.stringify(this.state.toCart);

        //send object to cart database via XML     
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:5000/Cart");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(sendToCart);
    }

    // method to add items to state
    addItems = () => {
        let newToppings = this.returnSelectedToppings();
        this.setState({
            toCart: {
                ...this.state.toCart,
                toppings: newToppings
            }
        }, this.updatePrice)
    }

}
export default MenuItem;