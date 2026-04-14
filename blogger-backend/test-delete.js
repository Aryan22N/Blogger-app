require('dotenv').config();
const mongoose = require('mongoose');
const posts = require('./schemas/posts-schema');

const dbURI = process.env.MONGODB_URI || "mongodb+srv://youtube:aryan123@aryan.pji3no8.mongodb.net/";

mongoose.connect(dbURI).then(async () => {
  console.log('Connected to DB');
  try {
    const postData = await posts.find();
    console.log('All Posts:', postData.length);
    if(postData.length > 0) {
      console.log('First post ID:', postData[0]._id);
      const deleteResult = await posts.deleteOne({ _id: postData[0]._id });
      console.log('Delete result:', deleteResult);
    }
  } catch(e) {
    console.error('Error:', e);
  }
  mongoose.disconnect();
}).catch(console.error);
