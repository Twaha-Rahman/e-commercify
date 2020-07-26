'use strict';

const { JWT_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');

const logger = require('./logger');

function cookieChecker(req, res, next) {
  const {
    cookies: { refreshToken }
  } = req;

  if (refreshToken) {
    try {
      const jwtPayload = jwt.verify(refreshToken, JWT_SECRET_KEY);
      req.jwtPayload = jwtPayload;
    } catch (error) {
      logger('Failed to verify JWT!', 'error', error);
    }
  }
  next();
}

module.exports = cookieChecker;
