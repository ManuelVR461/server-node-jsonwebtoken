'use strict'

const userCtrl = {};

const Users = require('../models/user.model');
const auth = require('../authenticator')

userCtrl.loginUser = async (req,res)=> {
    await Users.find(
        {nombre:req.body.nombre},
        (err,user)=>{
            if(err) throw err;
            if(!user) {
                res.json({success:true,message:'Usuario no Encontrado'});
            } else {
                if(user.password != req.body.password) {
                    res.json({success:false,message:'Password Erronea!'});
                } else {
                    const token = auth.createToken(req,res,user);
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

userCtrl.createUser = async (req,res) =>{
    const userPrueba = new Users({
        nombre:"Mayerlin",
        password:"123456",
        admin:true
    });

    await userPrueba.save((err)=>{
        if(err) throw err;
        res.json({success:true});
    })
}

module.exports = userCtrl;