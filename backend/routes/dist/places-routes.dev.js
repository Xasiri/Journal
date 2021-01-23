"use strict";

var express = require('express');

var _require = require('express-validator'),
    check = _require.check;

var placesControllers = require('../controllers/places-controllers');

var fileUpload = require('../middleware/file-upload');

var checkAuth = require('../middleware/check-auth');

var router = express.Router();
router.get('/:pid', placesControllers.getPlaceById);
router.get('/user/:uid', placesControllers.getPlacesByUserId);
router.use(checkAuth);
router.post('/', fileUpload.single('image'), [(check('title').not().isEmpty(), check('description').isLength({
  min: 5
}), check('address').not().isEmpty())], placesControllers.createPlace);
router.patch('/:pid', [check('title').not().isEmpty(), check('description').isLength({
  min: 5
})], placesControllers.updatePlace);
router["delete"]('/:pid', placesControllers.deletePlace);
module.exports = router;