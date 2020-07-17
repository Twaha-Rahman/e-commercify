/**
 * @file connect-to-mongodb.js
 */
'use strict';

const mongoose = require('mongoose');

const { MONGO_URL } = process.env;
const logger = require('./modules/log-formatter');

const connectToMongoDb = async () => {
  if (mongoose.connection.readyState === 1) {
    throw new Error('A ready MongoDB connection already exists.');
  }

  const formattedInfoLog = logger('Connecting to MongoDB...', 'info');

  console.log(formattedInfoLog);

  try {
    const client = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const formattedSuccessLog = logger(
      'MongoDB connection was successful!\n',
      'success'
    );

    console.log(`\n${formattedSuccessLog}`);

    client.connection.onClose(() => {
      const formattedInfoLogMessage = logger(
        'MongoDB connection was closed.',
        'info'
      );
      console.log(formattedInfoLogMessage);
    });
  } catch (error) {
    const formattedErrorLogMessage = logger(
      'Could not connect to MongoDB!\n\n',
      'error'
    );
    console.error(`\n${formattedErrorLogMessage}`, error);
    process.exit(1);
  }
};

module.exports = connectToMongoDb;
