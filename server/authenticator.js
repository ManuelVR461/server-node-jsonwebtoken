const jwt = require('jsonwebtoken');

const auth = {};

auth.createToken = (req,res,user) => {
    const expiresIn = 2 * 60; // 24 * 60 * 60
    return jwt.sign({user},req.app.get('keySecret'),{expiresIn:expiresIn});   
}

auth.authenticator = (req,res,next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token,req.app.get('keySecret'), (err,decoded) => {
            if(err) {
                return res.json({
                    success: false,
                    message: 'Autentificacion Fallida'
                })
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({success:false,message: 'No existe token'});
    }
}

module.exports = auth;
