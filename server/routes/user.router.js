'use strict'

const express = require('express');
const router = express.Router();
const auth = require('../authenticator')

const userCtrl = require('../controllers/user.controller');

router.post('/login',userCtrl.loginUser);
router.get('/', auth.authenticator ,userCtrl.getUsers);
router.post('/register', auth.authenticator ,userCtrl.createUser);

module.exports = router;