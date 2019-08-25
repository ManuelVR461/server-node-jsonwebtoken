'use strict'

const userCtrl = {};

const Users = require('../models/user.model');
const auth = require('../authenticator')

userCtrl.loginUser = async (req,res)=> {
    await Users.findOne(
        {email:req.body.email.toLowerCase()},
        (err,user)=>{
            if(err) throw err;
            if(!user) {
                res.json({success:true,message:'Usuario no Encontrado'});
            } else {
                if(!user.comparePassword(req.body.password)){
                    res.json({success:false,message:'Password Erronea!'});
                } else {
                    const token = auth.createToken(req,res,
                        {email: user.email, nombre: user.nombre});
                        console.log(token);
                    res.json({
                        success:true,
                        message:'Login Aceptado',
                        token
                    })
                }
            }
        }
    )
}

userCtrl.getUsers = async (req,res)=>{
    await Users.find({},(err,users)=>{
        if(err) throw err;
        res.json(users);
    })
}

userCtrl.userProfile = async (req, res) => {
    await Users.findOne({ email: req.email },
        (err, users) => {
            if (!users)
                return res.status(404).json({ status: false, message: 'Usuario No Encontrado.' });
            else
                return res.status(200).json({ status: true});
        }
    );
}

userCtrl.createUser = async (req,res) => {    
    const newUser = new Users({
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
        admin:true
    });
    
    await newUser.save((err,user)=>{
        if (err && err.code === 11000) return res.status(409).send('Email ya existe');
        if (err) return res.status(500).send('Error de Servidor');
        return res.status(200).json({ success:true,user});
    });
}

module.exports = userCtrl;