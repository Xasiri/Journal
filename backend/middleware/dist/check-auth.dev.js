"use strict";

var jwt = require('jsonwebtoken');

var HttpError = require('../models/http-error');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    var token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'

    if (!token) {
      throw new Error('Authentication failed!');
    }

    var decodedToken = jwt.verify(token, 'supersecret_dont_share');
    req.userData = {
      userId: decodedToken.userId
    };
    next();
  } catch (err) {
    var error = new HttpError('Authentication failed!', 401);
    return next(error);
  }
};