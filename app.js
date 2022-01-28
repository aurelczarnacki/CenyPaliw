const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

require('dotenv').config()

mongoose.connect("mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASS+"@cluster0.jeqdq.mongodb.net/"+process.env.DB_NAME+"?retryWrites=true&w=majority");

const app = express();

app.use("/uploads",express.static('uploads'));

const fuelRoutes = require("./api/routes/fuel");

app.use(morgan("combined"))

app.use(bodyParser.json());

app.use("/fuel", fuelRoutes);

app.use((req, res, next) => {
    res.status(404).json({wiadomosc: "NOT FOUND"});
});

module.exports = app;
