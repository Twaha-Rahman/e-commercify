/**
 * @file connect-to-mongodb.js
 */
'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const connectToMongoDb = () => {
  if (mongoose.connection.readyState === 1) {
    throw new Error('A ready MongoDB connection already exists.');
  }

  return mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((client) => client.connection);
};

module.exports = connectToMongoDb;
