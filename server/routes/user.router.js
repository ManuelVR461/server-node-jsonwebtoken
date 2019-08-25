'use strict'

const express = require('express');
const router = express.Router();
const auth = require('../authenticator')

const userCtrl = require('../controllers/user.controller');

router.post('/login',userCtrl.loginUser);

router.post('/register', userCtrl.createUser);

router.get('/', auth.authenticator ,userCtrl.getUsers);


module.exports = router;