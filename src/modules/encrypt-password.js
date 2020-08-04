/**
 * @file encrypt-password.js - Simple password encryption function using
 *   bcrypt-pbkdf.
 */
'use strict';

const { pbkdf } = require('bcrypt-pbkdf');

const { SALT } = process.env;

(function validateSaltVariable() {
  const minSaltLengh = 12;

  if (typeof SALT !== 'string' || SALT.length < minSaltLengh) {
    throw new TypeError(
      // eslint-disable-next-line max-len
      `The SALT environment variable must be at least ${minSaltLengh} characters long.`
    );
  }
})();

/**
 * Encrypts a password using bcrypt.
 *
 * - The salt is extracted from the SALT environment variable.
 *
 * - For security this function does not return a string but a mutable buffer,
 *   so that you can immediately clear it after use by doing `buffer.fill(0)`.
 *
 * @param {string} password
 * @param {number} [outputLength] - The length the generated output should be.
 * @param {number} [numberOfRounds] - The number of rounds of the PBKDF
 *   encryption algorithm to perform.
 * @returns {Buffer}
 */
function encryptPassword(password, outputLength = 32, numberOfRounds = 1) {
  if (typeof password !== 'string') {
    throw new TypeError('Argument `password` must be a string.');
  }

  const buffer = Buffer.from(password);
  /*
   * Note that `buffer.length` is not the same as `password.length` since
   *   passwords may contain non-ASCII characters.
   */
  const bufferLength = buffer.length;
  const saltBuffer = Buffer.from(SALT);
  const saltBufferLength = saltBuffer.length;
  const outputBuffer = Buffer.alloc(outputLength);

  pbkdf(
    buffer,
    bufferLength,
    saltBuffer,
    saltBufferLength,
    outputBuffer,
    outputLength,
    numberOfRounds
  );
  return outputBuffer;
}

module.exports = encryptPassword;
