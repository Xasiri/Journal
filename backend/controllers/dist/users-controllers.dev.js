"use strict";

var _require = require('express-validator'),
    validationResult = _require.validationResult;

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var HttpError = require('../models/http-error');

var User = require('../models/user');

var getUsers = function getUsers(req, res, next) {
  var users, error;
  return regeneratorRuntime.async(function getUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.find({}, '-password'));

        case 3:
          users = _context.sent;
          _context.next = 10;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          error = new HttpError('Fetching users failed, please try again later.', 500);
          return _context.abrupt("return", next(error));

        case 10:
          res.json({
            users: users.map(function (user) {
              return user.toObject({
                getters: true
              });
            })
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

var signup = function signup(req, res, next) {
  var errors, _req$body, name, email, password, existingUser, error, _error, hashedPassword, _error2, createdUser, _error3, token, _error4;

  return regeneratorRuntime.async(function signup$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", next(new HttpError('Invalid inputs passed, please check your data.', 422)));

        case 3:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          _context2.prev = 4;
          _context2.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 7:
          existingUser = _context2.sent;
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](4);
          error = new HttpError('Signing up failed, please try again later.', 500);
          return _context2.abrupt("return", next(error));

        case 14:
          if (!existingUser) {
            _context2.next = 17;
            break;
          }

          _error = new HttpError('User exists already, please login instead.', 422);
          return _context2.abrupt("return", next(_error));

        case 17:
          _context2.prev = 17;
          _context2.next = 20;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 12));

        case 20:
          hashedPassword = _context2.sent;
          _context2.next = 27;
          break;

        case 23:
          _context2.prev = 23;
          _context2.t1 = _context2["catch"](17);
          _error2 = new HttpError('Could not create user, please try again.', 500);
          return _context2.abrupt("return", next(_error2));

        case 27:
          createdUser = new User({
            name: name,
            email: email,
            image: req.file.path,
            password: hashedPassword,
            places: []
          });
          _context2.prev = 28;
          _context2.next = 31;
          return regeneratorRuntime.awrap(createdUser.save());

        case 31:
          _context2.next = 37;
          break;

        case 33:
          _context2.prev = 33;
          _context2.t2 = _context2["catch"](28);
          _error3 = new HttpError('Signing up failed, please try again later.', 500);
          return _context2.abrupt("return", next(_error3));

        case 37:
          _context2.prev = 37;
          token = jwt.sign({
            userId: createdUser.id,
            email: createdUser.email
          }, 'supersecret_dont_share', {
            expiresIn: '1h'
          });
          _context2.next = 45;
          break;

        case 41:
          _context2.prev = 41;
          _context2.t3 = _context2["catch"](37);
          _error4 = new HttpError('Signing up failed, please try again later.', 500);
          return _context2.abrupt("return", next(_error4));

        case 45:
          res.status(201).json({
            userId: createdUser.id,
            email: createdUser.email,
            token: token
          });

        case 46:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 10], [17, 23], [28, 33], [37, 41]]);
};

var login = function login(req, res, next) {
  var _req$body2, email, password, existingUser, error, _error5, isValidPassword, _error6, _error7, token, _error8;

  return regeneratorRuntime.async(function login$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          existingUser = _context3.sent;
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](1);
          error = new HttpError('Logging in failed, please try again later.', 500);
          return _context3.abrupt("return", next(error));

        case 11:
          if (existingUser) {
            _context3.next = 14;
            break;
          }

          _error5 = new HttpError('Invalid credentials, could not log you in.', 403);
          return _context3.abrupt("return", next(_error5));

        case 14:
          isValidPassword = false;
          _context3.prev = 15;
          _context3.next = 18;
          return regeneratorRuntime.awrap(bcrypt.compare(password, existingUser.password));

        case 18:
          isValidPassword = _context3.sent;
          _context3.next = 25;
          break;

        case 21:
          _context3.prev = 21;
          _context3.t1 = _context3["catch"](15);
          _error6 = new HttpError('Could not log you in, please check your credentials and try again.', 500);
          return _context3.abrupt("return", next(_error6));

        case 25:
          if (isValidPassword) {
            _context3.next = 28;
            break;
          }

          _error7 = new HttpError('Invalid credentials, could not log you in.', 403);
          return _context3.abrupt("return", next(_error7));

        case 28:
          _context3.prev = 28;
          token = jwt.sign({
            userId: existingUser.id,
            email: existingUser.email
          }, 'supersecret_dont_share', {
            expiresIn: '1h'
          });
          _context3.next = 36;
          break;

        case 32:
          _context3.prev = 32;
          _context3.t2 = _context3["catch"](28);
          _error8 = new HttpError('Logging in failed, please try again later.', 500);
          return _context3.abrupt("return", next(_error8));

        case 36:
          res.json({
            userId: existingUser.id,
            email: existingUser.email,
            token: token
          });

        case 37:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 7], [15, 21], [28, 32]]);
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;