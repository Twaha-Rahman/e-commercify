'use strict';

const { JWT_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');

const logger = require('./logger');

/**
 * Checks cookies and passes valid cookies to the Express request object
 * under the `refreshTokenPayload` key.
 *
 * @param {Express.Request} req - The request object of a request
 * @param {Express.Response} res - The response object of a request
 * @param {Function} next - A function to call the next middleware.
 *
 */

function cookieChecker(req, res, next) {
  const {
    cookies: { refreshToken }
  } = req;

  if (refreshToken) {
    try {
      const jwtPayload = jwt.verify(refreshToken, JWT_SECRET_KEY);
      req.refreshTokenPayload = jwtPayload;
    } catch (error) {
      logger('Failed to verify JWT!', 'error', error);
    }
  }
  next();
}

module.exports = cookieChecker;
