import { Component } from "react";

class Login extends Component {
    // sets state of login fields
    state = {
        email: "",
        password: "",
        isRestaurant: false,
        // message to send user
        message: ""
    }
    render() {
        return (
            <div className="login-div">
                {/* creates bootstrap login form */}
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            // sets value to the email state
                            value={this.state.email}
                            // sets the state to change on event listener
                            onChange={(event) => {
                                this.setState({ email: event.target.value })
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            // sets value to the password state
                            value={this.state.password}
                            // sets the state to change on event listener
                            onChange={(event) => {
                                this.setState({ password: event.target.value })
                            }}
                        />
                    </div>
                    {this.state.message}
                    <br className="login-break"></br>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        // when user clicks it executes the login method
                        onClick={this.login}>
                        Login
                    </button>
                </form>
            </div>
        )
    }

    login = async () => {
        // fetches response from get request and checks if components are equal to state
        let response = await fetch(
            `http://localhost:5000/Users
            ?email=${this.state.email}
            &password=${this.state.password}`,
            { method: "GET" })

        // converts response to js array
        let login = await response.json();

        // checks for verification of login credentials for customer
        if (login & this.state.isRestaurant === false) {
            this.setState({ message: <span className="text-success">Successfully signed in as Customer</span> })
        }
        // checks credentials for restaurant
        else if (login & this.state.isRestaurant === true) {
            this.setState({ message: <span className="text-success">Successfully signed in as Restaurant</span> })
        }
        // error message for failed login
        else {
            this.setState({ message: <span className="text-danger">Sign in failed. Please try again.</span> })
        }
    }
}

export default Login;