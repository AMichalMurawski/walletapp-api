const express = require('express');
const router = express.Router();
const userController = require('../../controller/usersController');
const auth = require('../../middlewares/userAuth');

router.get('/current', auth, userController.currentUser);

router.get('/verify/:verificationToken', userController.verifyToken);

router.post('/verify', userController.sendVerification);

router.post('/new-tokens', userController.newTokens);

module.exports = router;
