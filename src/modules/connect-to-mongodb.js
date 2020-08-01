/**
 * @file connect-to-mongodb.js - Reusable MongoDB connection logic with logging
 * and default options that avoid warnings.
 */

const mongoose = require('mongoose');

const { MONGO_URL } = process.env;
const logger = require('./logger');

const connectToMongoDb = async () => {
  if (mongoose.connection.readyState === 1) {
    throw new Error('A ready MongoDB connection already exists.');
  }

  logger('Connecting to MongoDB...\n', 'info');

  try {
    const client = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    logger('MongoDB connection was successful!\n', 'success');

    client.connection.onClose(() => {
      logger('MongoDB connection was closed.', 'info');
    });
  } catch (error) {
    logger('Could not connect to MongoDB!\n\n', 'setup', error);
    process.exit(1);
  }
};

module.exports = connectToMongoDb;
