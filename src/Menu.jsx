import { Component } from "react";
import NavBar from "./Nav";
import MenuItem from "./MenuItem";
import { DateTime } from "luxon";

class Menu extends Component {
    //Creates the menu as part of the state in base for (no add-ons)
    state = {
        menu: [],
        time: null
    }

    render() {
        // renders empty cart message when no more items

        return (
            <>
                <NavBar />
                <div className="cart-div">
                    <h4>Menu</h4>
                    {this.closedMessage()}
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
            </>
        )
    }

    // method to output closed message
    closedMessage = () => {
        if (this.state.time < 11 | this.state.time >= 9) {
            return (
                <h5><br></br>The restaurant is currently <strong>closed</strong>.
                    <br></br><br></br>Items can be added to your cart but can't be placed until the restaurant opens.
                    <br></br><br></br>The restaurant is open from 11:00AM to 9:00PM Pacific Standard Time.
                    <br></br><br></br></h5>
            )
        }
    }

    // method to set current time
    setTime = () => {
        // gets US Pacific time
        const zone = "America/Los_Angeles"
        const time = DateTime.now().setZone(zone).hour;
        this.setState({
            currentTimeHours: time
        })
    }

    // checks to see if component mounts then make HTTP requests
    componentDidMount = async () => {
        // get request from database server
        let response = await fetch(" http://localhost:5000/menu", { method: "GET" })
        // converts the json data to js array
        let menu = await response.json();
        // sets time
        this.setTime();
        // sets the state to fetched values
        this.setState({ menu: menu });
    }
}


export default Menu;