const mongoose = require("mongoose");

const fuelSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    Address: String,
    Name: String,
    Price98: Number,
    Price95: Number
})

module.exports = mongoose.model("Fuel", fuelSchema)