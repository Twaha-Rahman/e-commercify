/**
 * @file cli-argument-parse.js - Reusable command-line argument parser for
 * our MongoDB scripts.
 */

const { ArgumentParser } = require('argparse');

/**
 * @returns {argparse.ArgumentParser}
 */
function cliArgumentParser() {
  const parser = new ArgumentParser({
    addHelp: true,
    description: 'Inserts random product data into MongoDB.'
  });

  parser.addArgument(['-k', '--keep'], {
    action: 'storeTrue',
    help: 'Do not delete already existing product documents.'
  });
  return parser.parseArgs();
}

module.exports = cliArgumentParser;
