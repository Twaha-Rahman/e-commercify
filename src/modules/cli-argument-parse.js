/**
 * @file cli-argument-parse.js - Reusable command-line argument parser for
 * our MongoDB scripts.
 */
'use strict';

const { ArgumentParser } = require('argparse');

/**
 * @returns {argparse.ArgumentParser}
 */
function cliArgumentParser() {
  const parser = new ArgumentParser({
    // eslint-disable-next-line
    add_help: true,
    description: 'Inserts random product data into MongoDB.'
  });

  parser.add_argument('-k', '--keep', {
    action: 'store_true',
    help: 'Do not delete already existing product documents.'
  });
  return parser.parse_args();
}

module.exports = cliArgumentParser;
