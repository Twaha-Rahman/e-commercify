/**
 * @file connect-to-mongodb.js
 */
'use strict';

const mongoose = require('mongoose');

const { MONGO_URL } = process.env;

const connectToMongoDb = async () => {
  if (mongoose.connection.readyState === 1) {
    throw new Error('A ready MongoDB connection already exists.');
  }

  const client = await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return client.connection;
};

module.exports = connectToMongoDb;
