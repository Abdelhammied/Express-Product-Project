/* -- -- -- -- Third Party Libraries Starts -- -- -- -- */
const express = require("express");
const bodyParser = require("body-parser");
const edge = require('express-edge');
const mongoose = require('mongoose');
const session = require('express-session');
const csrf = require('csurf');
/* -- -- -- -- Third Party Libraries Ends -- -- -- -- */

/* -- -- -- -- Local Moduels Starts -- -- -- --  */
const routes = require('./app/routes/routes');
/* -- -- -- -- Local Modules Ends -- -- -- --  */

/* -- -- -- -- CONST STARTS -- -- -- --  */
const MONGODB_URI = "mongodb://localhost:27017/shop";
const csrfProtection = csrf(); 
/* -- -- -- -- CONST ENDS -- -- -- --  */

/* -- -- -- -- App Config Starts -- -- -- -- */
const app = express();
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
app.use(express.static("public"));
app.set("views", "views");
app.use(edge);
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    secret: "Secret Key",
    resave: false,
    saveUninitialized: true
}));
app.use(csrfProtection);
app.use(routes);
/* -- -- -- -- App Config Ends -- -- -- -- */
mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true
    })
    .then(() => {
        app.listen(3000);
        console.log("Connected !");
    }).catch(err => {
        console.log(err);
    })