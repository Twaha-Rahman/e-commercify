'use strict';

const { ArgumentParser } = require('argparse');

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
