import { Component } from "react";
//import all components rendered
import NavBar from "./Nav";
import Orders from "./Orders";
import Cart from "./Cart";
import Menu from "./Menu";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import NoPage from "./noPage.jsx";

// for routing
import { Route, Routes } from "react-router-dom";

//main App to combine all components and be rendered
class App extends Component {
    render() {
        return (
            // routes for each URL extension
            <Routes>
                {/* <Route path="/" exact element={<Login />} /> */}
                <Route path="/menu" exact element={<Menu />} />
                <Route path="/cart" exact element={<Cart />} />
                <Route path="/" exact element={<Home />} />
                <Route path="/orders" exact element={<Orders />} />
                {/* for 404 errors */}
                <Route path="*" element={<NoPage />} />
            </Routes>
        )
    }
}

export default App;