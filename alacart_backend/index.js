const cors = require("cors")
const express = require("express")
require('dotenv').config();
//adds stripe key
const stripe = require("stripe")(process.env.REACT_APP_SECRET_KEY)

const app = express();

// middleware
app.use(express.json())
app.use(cors())

// routes
app.get("/", (req, res) => {
    res.send("We are up Johnny!")
})

app.post("/payment", (req, res) => {
    // extracts total price and token with info from frontend
    const { price, token } = req.body;

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: parseInt((price * 100).toFixed(2)),
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email
        })
    }).then(result => res.status(200).json(result))
        .catch(error => console.log(error))
})

// listen
app.listen(8000, () => console.log("LISTENING AT PORT 8000"))