const mongoose = require("mongoose");

const dbConnection = () => {
  const dbURI = process.env.MONGODB_URI;
  return mongoose.connect(dbURI);
};

module.exports = dbConnection;
