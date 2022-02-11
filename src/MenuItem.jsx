import { Component } from "react";

//component for a single product
class MenuItem extends Component {

    //adds the props to state so they can be changed
    state = {
        item: this.props.item,
        //stores an item to send to cart
        toCart: [
            {
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
        ]
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
                                // sets value to the quantity
                                value={this.state.toCart.quantity}
                                // sets the state to change on event listener
                                onChange={(event) => {
                                    this.setState({ quantity: event.target.value })
                                }}
                            />
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
                                        value={topping[0]}
                                        // sets the state to change on event listener
                                        onChange={(event) => {
                                            this.state.toCart[0].toppings.push(event.target.value);
                                        }}
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

    // method to add items to state
    addItems = () => {
        console.log(this.state.toCart);
    }
}

export default MenuItem;