import { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
    state = {
        cartCount: this.props.cartTotal
    }
    render() {
        return (
            // adds bootstrap navbar
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    {/* company name */}
                    <h1 className="navbar-brand">A la Cart</h1>
                    {/* responsive features */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* nav links */}
                            <li className="nav-item">
                                <Link className="nav-link active" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/menu">Menu</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/cart">Cart
                                    {/* renders number of items in cart */}
                                    <span className="cart-badge badge bg-danger">{this.state.cartCount}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBar;