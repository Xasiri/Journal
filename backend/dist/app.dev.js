"use strict";

var fs = require('fs');

var path = require('path');

var express = require('express');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var placesRoutes = require('./routes/places-routes');

var usersRoutes = require('./routes/users-routes');

var HttpError = require('./models/http-error');

var app = express();
app.use(bodyParser.json());
app.use('/uploads/images', express["static"](path.join('uploads', 'images')));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);
app.use(function (req, res, next) {
  var error = new HttpError('Could not find this route.', 404);
  throw error;
});
app.use(function (error, req, res, next) {
  if (req.file) {
    console.log('error', req.file.path);
    fs.unlink(req.file.path, function (err) {
      console.log('app.js err', err);
    });
  }

  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({
    message: error.message || 'An unknown error occurred!'
  });
});
mongoose.connect("mongodb+srv://admin:fmR4swKLj7Pw5F11@cluster0.zvn8h.mongodb.net/new?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(function () {
  app.listen(process.env.PORT || 5000);
})["catch"](function (err) {
  console.log(err);
});