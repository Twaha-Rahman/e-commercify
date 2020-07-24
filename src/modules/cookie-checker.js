'use strict';

const { JWT_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');

const logger = require('./logger');

function cookieChecker(req, res, next) {
  const { cookies } = req;

  let auth;

  console.log(req.cookies);
  if (Object.keys(cookies).length > 0) {
    try {
      const cookieObjects = Object.entries(cookies);
      // eslint-disable-next-line
      for (const [key, value] of cookieObjects) {
        const data = jwt.verify(value, JWT_SECRET_KEY);
        console.log(data);
      }

      auth = {
        payload: '{ userId }',
        isCookieSet: false,
        isValid: true
      };
    } catch (error) {
      console.log(error);
      logger('Failed to verify JWT!', 'error', error);
      auth = {
        isCookieSet: false,
        isValid: false
      };
      req.authData = auth;
    }
  } else {
    auth = {
      isCookieSet: false,
      isValid: true
    };
  }

  req.authData = auth;
  next();
}

module.exports = cookieChecker;
