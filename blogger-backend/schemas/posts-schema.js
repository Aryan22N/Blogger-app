const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title:String,
    description:String,
    status: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categories' 
    },
    author:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Authors' 
    }
  });
  
  module.exports = mongoose.model('Posts', postSchema);
