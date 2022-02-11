import { Component } from "react"

class Home extends Component {
    render() {
        return (
            <div className="home-div">
                <h1 className="home-element">Welcome!</h1>
                <h3 className="home-element">Hit the button below to browse through all our delicious restaurants.</h3>
                {/* imports bootstrap button */}
                <a className="btn btn-primary home-element" href="/#" role="button">Restaurants</a>
            </div>
        )
    }
}

export default Home;