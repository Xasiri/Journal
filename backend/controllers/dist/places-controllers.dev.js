"use strict";

var fs = require('fs');

var _require = require('express-validator'),
    validationResult = _require.validationResult;

var mongoose = require('mongoose');

var HttpError = require('../models/http-error');

var getCoordsForAddress = require('../util/location');

var Place = require('../models/place');

var User = require('../models/user');

var getPlaceById = function getPlaceById(req, res, next) {
  var placeId, place, error, _error;

  return regeneratorRuntime.async(function getPlaceById$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          placeId = req.params.pid;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(Place.findById(placeId));

        case 4:
          place = _context.sent;
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          error = new HttpError('Something went wrong, could not find a place.', 500);
          return _context.abrupt("return", next(error));

        case 11:
          if (place) {
            _context.next = 14;
            break;
          }

          _error = new HttpError('Could not find place for the provided id.', 404);
          return _context.abrupt("return", next(_error));

        case 14:
          res.json({
            place: place.toObject({
              getters: true
            })
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
};

var getPlacesByUserId = function getPlacesByUserId(req, res, next) {
  var userId, userWithPlaces, error;
  return regeneratorRuntime.async(function getPlacesByUserId$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userId = req.params.uid; // let places;

          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findById(userId).populate('places'));

        case 4:
          userWithPlaces = _context2.sent;
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](1);
          error = new HttpError('Fetching places failed, please try again later.', 500);
          return _context2.abrupt("return", next(error));

        case 11:
          if (!(!userWithPlaces || userWithPlaces.places.length === 0)) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", next(new HttpError('Could not find places for the provided user id.', 404)));

        case 13:
          res.json({
            places: userWithPlaces.places.map(function (place) {
              return place.toObject({
                getters: true
              });
            })
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 7]]);
};

var createPlace = function createPlace(req, res, next) {
  var errors, _req$body, title, description, address, coordinates, createdPlace, user, error, _error2, sess, _error3;

  return regeneratorRuntime.async(function createPlace$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", next(new HttpError('Invalid inputs passed, please check your data.', 422)));

        case 3:
          _req$body = req.body, title = _req$body.title, description = _req$body.description, address = _req$body.address;
          _context3.prev = 4;
          _context3.next = 7;
          return regeneratorRuntime.awrap(getCoordsForAddress(address));

        case 7:
          coordinates = _context3.sent;
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](4);
          return _context3.abrupt("return", next(_context3.t0));

        case 13:
          createdPlace = new Place({
            title: title,
            description: description,
            address: address,
            location: coordinates,
            image: req.file.path,
            creator: req.userData.userId
          });
          _context3.prev = 14;
          _context3.next = 17;
          return regeneratorRuntime.awrap(User.findById(req.userData.userId));

        case 17:
          user = _context3.sent;
          _context3.next = 24;
          break;

        case 20:
          _context3.prev = 20;
          _context3.t1 = _context3["catch"](14);
          error = new HttpError('Creating place failed, please try again.', 500);
          return _context3.abrupt("return", next(error));

        case 24:
          if (user) {
            _context3.next = 27;
            break;
          }

          _error2 = new HttpError('Could not find user for provided id.', 404);
          return _context3.abrupt("return", next(_error2));

        case 27:
          console.log(user);
          _context3.prev = 28;
          _context3.next = 31;
          return regeneratorRuntime.awrap(mongoose.startSession());

        case 31:
          sess = _context3.sent;
          sess.startTransaction();
          _context3.next = 35;
          return regeneratorRuntime.awrap(createdPlace.save({
            session: sess
          }));

        case 35:
          user.places.push(createdPlace);
          _context3.next = 38;
          return regeneratorRuntime.awrap(user.save({
            session: sess
          }));

        case 38:
          _context3.next = 40;
          return regeneratorRuntime.awrap(sess.commitTransaction());

        case 40:
          _context3.next = 46;
          break;

        case 42:
          _context3.prev = 42;
          _context3.t2 = _context3["catch"](28);
          _error3 = new HttpError('Creating place failed, please try again.', 500);
          return _context3.abrupt("return", next(_error3));

        case 46:
          res.status(201).json({
            place: createdPlace
          });

        case 47:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[4, 10], [14, 20], [28, 42]]);
};

var updatePlace = function updatePlace(req, res, next) {
  var errors, _req$body2, title, description, placeId, place, error, _error4, _error5;

  return regeneratorRuntime.async(function updatePlace$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", next(new HttpError('Invalid inputs passed, please check your data.', 422)));

        case 3:
          _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description;
          placeId = req.params.pid;
          _context4.prev = 5;
          _context4.next = 8;
          return regeneratorRuntime.awrap(Place.findById(placeId));

        case 8:
          place = _context4.sent;
          _context4.next = 15;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](5);
          error = new HttpError('Something went wrong, could not update place.', 500);
          return _context4.abrupt("return", next(error));

        case 15:
          if (!(place.creator.toString() !== req.userData.userId)) {
            _context4.next = 18;
            break;
          }

          _error4 = new HttpError('You are not allowed to edit this place.', 401);
          return _context4.abrupt("return", next(_error4));

        case 18:
          place.title = title;
          place.description = description;
          _context4.prev = 20;
          _context4.next = 23;
          return regeneratorRuntime.awrap(place.save());

        case 23:
          _context4.next = 29;
          break;

        case 25:
          _context4.prev = 25;
          _context4.t1 = _context4["catch"](20);
          _error5 = new HttpError('Something went wrong, could not update place.', 500);
          return _context4.abrupt("return", next(_error5));

        case 29:
          res.status(200).json({
            place: place.toObject({
              getters: true
            })
          });

        case 30:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[5, 11], [20, 25]]);
};

var deletePlace = function deletePlace(req, res, next) {
  var placeId, place, error, _error6, _error7, imagePath, sess, _error8;

  return regeneratorRuntime.async(function deletePlace$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          placeId = req.params.pid;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Place.findById(placeId).populate('creator'));

        case 4:
          place = _context5.sent;
          _context5.next = 11;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](1);
          error = new HttpError('Something went wrong, could not delete place.', 500);
          return _context5.abrupt("return", next(error));

        case 11:
          if (place) {
            _context5.next = 14;
            break;
          }

          _error6 = new HttpError('Could not find place for this id.', 404);
          return _context5.abrupt("return", next(_error6));

        case 14:
          if (!(place.creator.id !== req.userData.userId)) {
            _context5.next = 17;
            break;
          }

          _error7 = new HttpError('You are not allowed to delete this place.', 401);
          return _context5.abrupt("return", next(_error7));

        case 17:
          imagePath = place.image;
          _context5.prev = 18;
          _context5.next = 21;
          return regeneratorRuntime.awrap(mongoose.startSession());

        case 21:
          sess = _context5.sent;
          sess.startTransaction();
          _context5.next = 25;
          return regeneratorRuntime.awrap(place.remove({
            session: sess
          }));

        case 25:
          place.creator.places.pull(place);
          _context5.next = 28;
          return regeneratorRuntime.awrap(place.creator.save({
            session: sess
          }));

        case 28:
          _context5.next = 30;
          return regeneratorRuntime.awrap(sess.commitTransaction());

        case 30:
          _context5.next = 36;
          break;

        case 32:
          _context5.prev = 32;
          _context5.t1 = _context5["catch"](18);
          _error8 = new HttpError('Something went wrong, could not delete place.', 500);
          return _context5.abrupt("return", next(_error8));

        case 36:
          fs.unlink(imagePath, function (err) {
            console.log(err);
          });
          res.status(200).json({
            message: 'Deleted place.'
          });

        case 38:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 7], [18, 32]]);
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;