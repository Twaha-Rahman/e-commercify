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

  try {
    console.log('Connecting to MongoDB...');
    const client = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('\nMongoDB connection was successful!\n');

    client.connection.onClose(() => {
      console.log('MongoDB connection was closed.');
    });
  } catch (error) {
    console.error('\nCould not connect to MongoDB!\n\n', error);
    process.exit(1);
  }
};

module.exports = connectToMongoDb;
