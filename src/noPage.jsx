import { Component } from "react";

//for 404 error
class NoPage extends Component {
    render() {
        return (
            <div className="error-div">
                <br></br>
                <h4>Uh-oh! It's a 404 error!</h4>
                <p>Please check the URL and try again.</p>
            </div>
        )
    }
}

export default NoPage;