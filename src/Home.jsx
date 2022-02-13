import { Component } from "react"
import NavBar from "./Nav"
import { Link } from "react-router-dom"

class Home extends Component {
    render() {
        return (
            <>
                <NavBar />
                <div className="home-div">
                    <h1 className="home-element">Welcome!</h1>
                    <h3 className="home-element">Hit the button below to browse through all our delicious restaurants.</h3>
                    {/* imports bootstrap button */}
                    <Link className="btn btn-primary home-element" to="/menu">Restaurants</Link>
                </div>
            </>
        )
    }
}

export default Home;