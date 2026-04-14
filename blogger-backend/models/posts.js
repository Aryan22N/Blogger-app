const mongoose = require("mongoose");

const schema = mongoose.Schema({
	title: String,
	description: String,
    status: Boolean,
    created: Date,
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Categorys'
    }
})

module.exports = mongoose.model("Posts", schema)