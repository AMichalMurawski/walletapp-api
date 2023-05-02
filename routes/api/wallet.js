const express = require('express');
const router = express.Router();
const walletController = require('../../controller/walletController');
// const auth = require('../../middlewares/userAuth');

// router.get('/', auth, walletController.get); // przy pisaniu pomiń auth, wrzucimy go gdy przygotuję logowanie i rejestrację

module.exports = router;
