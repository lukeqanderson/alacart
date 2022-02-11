import { Component } from "react";
import MenuItem from "./MenuItem";

class Menu extends Component {
    //Creates the menu as part of the state in base for (no add-ons)
    state = {
        menu: []
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

        return (
            <div className="cart-div">
                <h4>Menu</h4>
                <div className="item-grid">
                    {/* loops the array to return elements */}
                    {this.state.menu.map((item, index) => {
                        //renders the item as a MenuItem component and passes in props
                        return (<MenuItem
                            key={item.id}
                            item={item}>
                        </MenuItem>);
                    })}
                </div>
            </div>
        )
    }
    // checks to see if component mounts then make HTTP requests
    componentDidMount = async () => {
        // get request from database server
        let response = await fetch(" http://localhost:5000/menu", { method: "GET" })
        // converts the json data to js array
        let menu = await response.json();
        // sets the state to fetched values
        this.setState({ menu: menu });
    }
}


export default Menu;