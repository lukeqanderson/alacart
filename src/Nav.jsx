import { Component } from "react";
import { MenuItem } from "./MenuItem"

class NavBar extends Component {
    state = {
        cartCount: 0
    }
    render() {
        return (
            // adds bootstrap navbar
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    {/* company name */}
                    <a className="navbar-brand" href="/#">A la Cart</a>
                    {/* responsive features */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* nav links */}
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/#">Restaurants</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/#">Cart
                                    {/* renders number of items in cart */}
                                    <span className="cart-badge badge bg-danger">{this.state.cartCount}</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }

    // method to set the state of the cart count
    changeCartCount = (count) => {
        this.setState({ cartCount: this.state.cartCount + count })
    }
}

export default NavBar;