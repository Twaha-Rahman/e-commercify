/**
 * @file log-formatter.js - Formats log messages.
 */
'use strict';

const chalk = require('chalk');

/**
 * Colorizes and formats a given log message for console output.
 *
 * @param {string} msg - The message to format.
 * @param {string} [logType='LOG'] - The log message type; defaults to 'LOG'.
 * @returns {string} A colorized and formatted string suitable for use with
 * `console.log()`.
 */
function logFormatter(msg, logType) {
  let logTag;
  let logText;

  switch (logType) {
    case 'success':
      logTag = chalk.bgGreen.bold('SUCCESS');
      logText = chalk.green(msg);
      break;

    case 'error':
      logTag = chalk.bgRed.bold('ERROR');
      logText = chalk.red(msg);
      break;

    case 'info':
      logTag = chalk.bgBlue.bold('INFO');
      logText = chalk.grey(msg);
      break;

    default:
      logTag = chalk.purple.bold('LOG');
      logText = msg;
      break;
  }

  const formattedText = `${logTag} ${logText}`;

  return formattedText;
}

module.exports = logFormatter;
