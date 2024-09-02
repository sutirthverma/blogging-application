const JWT = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

function createTokenForUser(user){
    console.log(secret);
    
    const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    };

    return JWT.sign(payload, secret);
}

function getToken(token){
    if(!token) return null;

    return JWT.verify(token);
}

module.exports = {
    createTokenForUser,
    getToken
}