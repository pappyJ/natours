const express = require('express');

const authController = require('./../controllers/authController');

const router = express.Router();

const viewController = require('./../controllers/viewController');

router.get('/', authController.isLogggedIn, viewController.getOverview);

router.get('/me', authController.protect, viewController.getAccount);

router.get('/tour/:slug', authController.isLogggedIn, viewController.getTour);

router.get('/login', viewController.login);

router.get('/signup', viewController.signUp);

// router.post('/user-data' ,authController.protect , viewController.updateUserData);

module.exports = router;
