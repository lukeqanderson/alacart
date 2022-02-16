import { Component } from "react";

class NavCheckout extends Component {
    state = {
        cartCount: 0
    }
    render() {
        return (
            // adds bootstrap navbar
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    {/* company name */}
                    <h1 className="navbar-brand">A la Cart</h1>
                </div>
            </nav>
        )
    }
}

export default NavCheckout;