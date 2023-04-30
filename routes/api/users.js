const express = require('express');
const router = express.Router();
const userController = require('../../controller/usersController');
const auth = require('../../middlewares/userAuth');

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/logout', auth, userController.logout);

router.get('/actualuser', auth, userController.actualuser);

module.exports = router;
