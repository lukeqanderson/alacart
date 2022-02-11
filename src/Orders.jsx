import { Component } from "react";

//The main component that is displayed to the user
class Orders extends Component {
    // elements to be rendered dyamically
    state = {
        pageTitle: "Orders in progress",
        customers: [
            {
                id: 1, name: "Billy",
                phone: "111-123",
                order: "Wings",
                type: "delivery",
                time: "30 mins",
                address: { street: "123 big road", city: "Portland", state: "OR", zip: 97255 },
                isReady: false
            },

            {
                id: 2, name: "Bob",
                phone: "222-222",
                order: "Burger",
                type: "pick-up",
                time: "20 mins",
                address: { street: "456 small road", city: "Beaverton", state: "OR", zip: 97221 },
                isReady: false
            },

            {
                id: 3, name: "Jill",
                phone: "333-333",
                order: "pizza",
                type: "delivery",
                time: "40 mins",
                address: { street: "8910 tiny road", city: "Tigard", state: "OR", zip: 97226 },
                isReady: false
            },
        ],
        count: 3,
    };

    // method that will change background for when an order is ready
    isReadyStyle(isReady) {
        //for when true
        if (isReady) {
            return "green-background";
        }
        else {
            return "white-background";
        }
    }

    render() {
        return (
            < div className="order-div" >
                <h4>{this.state.pageTitle}<span className="order-badge badge bg-danger">{this.state.count}</span></h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Order</th>
                            <th>Type</th>
                            <th>Time</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Order Ready</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.populateCustomers()}
                    </tbody>
                </table>
            </ div>
        )
    }

    // method to decrement count when order is ready
    decrementCustomerCount = () => {
        this.setState({ count: this.state.count - 1 });
    }

    //method to increment count when order is not ready
    incrementCustomerCount = () => {
        this.setState({ count: this.state.count + 1 });
    }

    //method to mark an order ready
    markReady = (customer) => {
        this.decrementCustomerCount();
        customer.isReady = true;
        //repopulates the customer row with changes
        this.populateCustomerRow(customer);
    }

    //method to mark an order as pending
    markPending = (customer) => {
        this.incrementCustomerCount();
        customer.isReady = false;
        //repopulates the customer row with changes
        this.populateCustomerRow(customer);
    }

    //deletes customer from customers array
    deleteCustomer = (index) => {
        //removes customer
        this.state.customers.splice(index, 1);
        //resets the state to load new deleted customers
        this.setState({ customers: this.state.customers });
    }

    // method to populate a row of customers
    populateCustomerRow = (customer, index) => {
        return (
            // populates the table of customers with green background if the order is ready
            <tr className={this.isReadyStyle(customer.isReady)} key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.order}</td>
                <td>{customer.type}</td>
                <td>{customer.time}</td>
                <td>{customer.phone}</td>
                <td>{customer.address.street + ", " + customer.address.city + ", " + customer.address.state + ", " + customer.address.zip}</td>
                <td>
                    {/* checks to see is order is ready and changes button and method */}
                    {customer.isReady === false
                        ? <button className="btn btn-success" onClick={() => { this.markReady(customer); }}>Ready</button>
                        : <div><button className="btn btn-danger" onClick={() => { this.markPending(customer); }}>Undo</button><button className="btn btn-primary" onClick={() => { this.deleteCustomer(index); }}>Done</button></div>}
                </td>
            </tr>
        )
    }

    // method to populate customer table
    populateCustomers = () => {
        return (
            this.state.customers.map((customer, index) => {
                return this.populateCustomerRow(customer, index);
            })
        )
    }
}

export default Orders;