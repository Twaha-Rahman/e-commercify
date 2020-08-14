'use strict';

const stripAnsi = require('strip-ansi');

const logFormatter = require('../../src/modules/log-formatter');

test('Format message as INFO', () => {
  const formmatedMsg = logFormatter('Test info message', 'info');
  const expectedOutput = 'INFO Test info message';

  expect(stripAnsi(formmatedMsg)).toBe(expectedOutput);
});

test('Format message as ERROR', () => {
  const formmatedMsg = logFormatter('Test error message', 'error');
  const expectedOutput = 'ERROR Test error message';

  expect(stripAnsi(formmatedMsg)).toBe(expectedOutput);
});

test('Format message as LOG (with the `logType` argument)', () => {
  const formmatedMsg = logFormatter('Test log message', 'log');
  const expectedOutput = 'LOG Test log message';

  expect(stripAnsi(formmatedMsg)).toBe(expectedOutput);
});

test('Format message as LOG (without passing the `logType` argument)', () => {
  const formmatedMsg = logFormatter('Test log message');
  const expectedOutput = 'LOG Test log message';

  expect(stripAnsi(formmatedMsg)).toBe(expectedOutput);
});

test('Format message as SUCCESS', () => {
  const formmatedMsg = logFormatter('Test success message', 'success');
  const expectedOutput = 'SUCCESS Test success message';

  expect(stripAnsi(formmatedMsg)).toBe(expectedOutput);
});

test('Try to format message without passing any parameter', () => {
  expect(logFormatter).toThrow('Parameter `msg` not provided!');
});
