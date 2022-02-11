import { Component } from "react";

//component for a single product
class CartItem extends Component {

    //adds the props to state so they can be changed
    state = {
        item: this.props.item
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
                    </div>
                    <p>Quantity <span className="item-quantity">{this.state.item.quantity}</span>
                        {/* buttons to increase and decrease quantity */}
                        <span><button className="item-plus-button btn btn-light" onClick={() => { this.props.decreaseQuantity(this.state.item) }}>-</button></span>
                        <span><button className="item-minus-button btn btn-light" onClick={() => { this.props.increaseQuantity(this.state.item) }}>+</button></span>
                    </p>
                    <p>Size: <span className="item-size">{this.state.item.size}
                        {/* if statements for wings to return number of wings with size */}
                        {this.state.item.name === "Wings" && this.state.item.size === "Small" ? <span> (6 piece) </span> : null}
                        {this.state.item.name === "Wings" && this.state.item.size === "Medium" ? <span> (10 piece) </span> : null}
                        {this.state.item.name === "Wings" && this.state.item.size === "Large" ? <span> (12 piece) </span> : null}
                        {/* if statements for pizza to return size of pizza */}
                        {this.state.item.name === "Pizza" && this.state.item.size === "Small" ? <span> (10 inch) </span> : null}
                        {this.state.item.name === "Pizza" && this.state.item.size === "Medium" ? <span> (12 inch) </span> : null}
                        {this.state.item.name === "Pizza" && this.state.item.size === "Large" ? <span> (14 inch) </span> : null}
                        {this.state.item.name === "Pizza" && this.state.item.size === "Extra Large" ? <span> (16 inch) </span> : null}
                    </span></p>
                    <p>Add-ons: <span className="item-toppings">
                        {/* returns all toppings if there are any */}
                        {this.state.item.toppings[0]
                            ? this.state.item.toppings.map((topping) => {
                                return <li key={topping[1]} className="topping-list-item">{topping[0]}</li>
                            })
                            // retruns "None." of there are no items in the array
                            : <span> None. </span>}
                    </span></p>
                    <p className="card-text">{this.state.item.description}</p>
                    {/* renders the button for deleting item */}
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default CartItem;