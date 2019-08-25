'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const {Schema} = mongoose;

const userSchema = new Schema({
    nombre: {
        type: String,
        required:'Por Favor Indique su Nombre',
        trim:true
        },
    email: {
        type: String,
        required:'Por Favor Entre su Correo',
        trim:true,
        lowercase:true
        },
    password: {
        type: String,
        required:'Password requerido',
        trim:true
    },
    saltSecret: String,
    admin: Boolean
    },{
        timestamps: true
});

userSchema.methods.comparePassword= function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.path('email').validate((val) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'email invalido.');

// Eventos
userSchema.pre('save', function (next) {
    if (!this.isModified("password")){
        next();
    }
    
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            this.saltSecret = salt;   
            next();
        });
    });    
});

module.exports = mongoose.model('Users', userSchema);