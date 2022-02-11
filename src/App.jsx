import { Component } from "react";
//import all components rendered
import NavBar from "./Nav";
import Orders from "./Orders";
import Cart from "./Cart";
import Menu from "./Menu";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
// for routing
import { Route } from "react-router";
import { BrowserRouter, Routes } from "react-router-dom";

//main App to combine all components and be rendered
class App extends Component {
    render() {
        return (
            <>
                <NavBar />
                <Routes>
                    <Route path="/" exact component={Login} />
                </Routes>
            </>
        )
    }
}

export default App;