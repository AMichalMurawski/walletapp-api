const express = require('express');
const router = express.Router();
const authController = require('../../controller/authController');
const auth = require('../../middlewares/userAuth');

router.post('/sign-up', authController.signup);

router.post('/sign-in', authController.signin);

router.get('/sign-out', auth, authController.signout);

module.exports = router;
