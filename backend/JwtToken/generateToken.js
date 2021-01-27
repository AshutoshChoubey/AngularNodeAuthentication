const jwt = require('jsonwebtoken');
const key = process.env.JWT_KEY;


module.exports=function(payload,callback){
jwt.sign(payload, key, {
    algorithm: "HS256",
    expiresIn: 604800
}, callback)
};