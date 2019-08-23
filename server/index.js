'use strict'

const express = require('express');
const morgan = require('morgan');

const { mongoose } = require('./database');


const config = require('./config');
const Users = require('./models/user.model');

const app = express();

//setting
const PORT = process.env.PORT || 3000
app.set('keySecret' , config.secret);

//middleware
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/user',require('./routes/user.router'));


app.listen(PORT, () => {
    console.log("servidor iniciado...");
});