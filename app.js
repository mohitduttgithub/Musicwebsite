const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
// const bodyparser = require("body-parser");
// const { assert } = require("console");
// const { doesNotMatch } = require("assert");
// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contactMusically', { useNewUrlParser: true, useUnifiedTopology: true });


app.use(express.static(path.join(__dirname, '/views')));
app.use(express.urlencoded())

var views_dir = './views';

app.get('/', (req, res) => {
    res.sendFile('index.html',{ root: views_dir } )
})
app.get('/about', (req, res) => {
    res.sendFile('about.html',{ root: views_dir } )
})
app.get('/services', (req, res) => {
    res.sendFile('services.html',{ root: views_dir } )
})
app.get('/contact', (req, res) => {
    res.sendFile('contact.html',{ root: views_dir } )
})
app.get('/classinfo', (req, res) => {
    res.sendFile('classinfo.html',{ root: views_dir } )
})

app.listen(805, () => {
    console.log("listning the port at 8000")
})

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,


});

const Contact = mongoose.model('Contact', contactSchema);

// app.post('/form', function (req, res) {
//     new Contact({
//         name: req.body.name,
//         phone: req.body.phone,
//         email: req.body.email,
//         address: req.body.address
//     }).save(function (err, doc) {
//         if (err) res.json(err);
//         else res.send('Successfully inserted!');
//     });
// });

app.post('/', (req, res)=>{
    var myData = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address
    });
    myData.save().then(() => {
        res.send("this item has been saved to the database")
    }).catch(()=> {
        res.status(400).send("item was not saved to database")
    })
    // res.status(200).render('contact.pug' );
})




























