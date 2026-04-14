const mongoose = require("mongoose")

const schema = mongoose.Schema({
	fname: String,
	lname: String,
    email: String,
    phone: String,
    password: String,
    address: String,
    status: String
})

module.exports = mongoose.model("User", schema)