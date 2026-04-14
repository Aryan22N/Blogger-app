const mongoose = require("mongoose");

const schema = mongoose.Schema({
	title: String,
	description: String,
    status: Boolean,
    created: Date,
    post : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Posts'
    }]
})

module.exports = mongoose.model("Categorys", schema)