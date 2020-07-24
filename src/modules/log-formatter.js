'use strict';

const chalk = require('chalk');

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

    case 'setup':
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
