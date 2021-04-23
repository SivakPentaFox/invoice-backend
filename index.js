const port = process.env.PORT || 9000
const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors')
var passport = require('passport')
require('dotenv').config()

const myClientDoc = mongoose.Schema({
    name: String,
    address: String,
    city: String,
    gst: String,
    state: String,
    pan: String,
})
const ClientObj = mongoose.model('myClient', myClientDoc)

const BusinessDoc = mongoose.Schema({
    name: String,
    address: String,
    city: String,
    gst: String,
    state: String,
    pan: String,
})
const BusinessObj = mongoose.model('Business', BusinessDoc)

const InvoiceDoc = mongoose.Schema({
    title: String,
    business: Object,
    client: Object,
    invoice: Object,
    bank: Object,
    items: Array,
})
const InvoiceObj = mongoose.model('Invoices', InvoiceDoc)

const PayDoc = mongoose.Schema({
    l_acc_name: String,
    l_bank_name: String,
    l_acc_no: String,
    l_ifsc: String,
    name: String,
    bank: String,
    acc_no: String,
    ifsc: String
})
const PayObj = mongoose.model('payment', PayDoc)
const db = mongoose.connection
const mongoose_url = process.env.db_url
mongoose.connect(mongoose_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
db.once('open', () => {
    console.log("DB connected")
})

const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cors())

app.post('/login', passport.authenticate('local'), function(req, res) {
    if (req.user) {
        res.status(200).send("Auth Success");
    } else {
        res.status(200).send("Auth Failed");
    }
});

app.get("/client", async (req, res) => {
    if (req.body.id) {
        var data = await ClientObj.findOne({
            _id: req.body.id
        })
    } else {
        var data = await ClientObj.find()
    }
    res.status(200).send({
        status: "SUCCESS",
        data: data
    })
})

app.post("/client", (req, res) => {
    var db = {}
    db = req.body
    ClientObj.create(db, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send({
                status: "Client addition accept"
            })
        }
    })
})

app.get("/invoice", async (req, res) => {
    var data = await InvoiceObj.find()
    res.status(200).send({
        status: "SUCCESS",
        data: data
    })
})
app.post("/invoice", async (req, res) => {
    console.log(req.body.id)
    if (req.body.id) {
        var data = await InvoiceObj.findOne({
            "_id": req.body.id
        })
        console.log(data)
        res.status(200).send({
            status: "SUCCESS",
            data: data
        })
    } else {
        var db = req.body
        InvoiceObj.create(db)
        res.status(200).send({
            status: "SUCCESS"
        })
        console.log(db)
    }
})

app.get("/pay", async (req, res) => {
    var data = await PayObj.find()
    res.status(200).send({
        status: "SUCCESS",
        data: data
    })
})
app.post("/pay", async (req, res) => {
    console.log(req.body.id)
    if (req.body.id) {
        var data = await PayObj.findOne({
            "_id": req.body.id
        })
        console.log(data)
        res.status(200).send({
            status: "SUCCESS",
            data: data
        })
    } else {
        var db = req.body
        PayObj.create(db)
        res.status(200).send({
            status: "SUCCESS"
        })
        console.log(db)
    }
})

app.get("/business", async (req, res) => {
    if (req.body.id) {
        var data = await BusinessObj.findOne({
            _id: req.body.id
        })
    } else {
        var data = await BusinessObj.find()
    }
    res.status(200).send({
        status: "SUCCESS",
        data: data
    })
})

app.post("/business", (req, res) => {
    var db = {}
    db = req.body
    BusinessObj.create(db, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send({
                status: "Business addition accept"
            })
        }
    })
})

app.listen(port, () => console.log(`Hello Sir runnning at ${port}`))