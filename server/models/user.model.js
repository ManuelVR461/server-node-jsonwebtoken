'use strict'

const mongoose = require('mongoose');
const {Schema} = mongoose;

const Users = new Schema({
    nombre: String,
    password: String,
    admin:Boolean
});

module.exports = mongoose.model('Users', Users);