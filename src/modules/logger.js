/**
 * @file logger.js - Logs info to the console (only in development) after
 *  formatting it and saves it in the DB if it is important (both production
 *  and development).
 */
'use strict';

const textFormatter = require('./log-formatter');
const SystemLog = require('../models/db/system-log');

async function logger(message, level, additionalData) {
  if (level === 'error') {
    try {
      const systemLogDocument = new SystemLog({
        message,
        level,
        additionalData
      });

      await systemLogDocument.save();
    } catch (error) {
      if (process.env.IS_PRODUCTION === 'false') {
        const formattedMessage = textFormatter(
          'Failed to save error log to DB!',
          'error'
        );

        console.log(formattedMessage);
      }
    }
  }

  if (process.env.IS_PRODUCTION === 'false') {
    const formattedMessage = textFormatter(message, level);

    console.log(formattedMessage);
  }
}

module.exports = logger;
