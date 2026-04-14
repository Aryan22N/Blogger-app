require('dotenv').config();
const mongoose = require('mongoose');
const Author = require('./schemas/auther-schema');

const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI).then(async () => {
  console.log('Connected to DB');
  try {
    const res = await Author.create({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@doe.com',
      phone: '123456'
    });
    console.log('Created!', res);
  } catch (e) {
    console.error('Error creating author:', e);
  }
  mongoose.disconnect();
}).catch(console.error);
