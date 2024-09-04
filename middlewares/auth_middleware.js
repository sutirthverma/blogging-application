const { validateToken } = require("../services/authentication");

function checkForAuthCookie(cookieName){
    return (req, res, next) => {

        const tokenCookieValue = req.cookies[cookieName];
        console.log(tokenCookieValue);        

        if(!tokenCookieValue){
            return next();
        }

        try{
            const userPayload = validateToken(tokenCookieValue);
            console.log(userPayload);   
            req.user = userPayload;
        }catch(err){
            console.log(err.message);
            
        }

        next();
    }
}

module.exports = {
    checkForAuthCookie
}