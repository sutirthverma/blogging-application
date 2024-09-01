const User = require('../models/user_model');

//SIGN UP
async function handleGetSignUpPage(req, res) {
    return res.render('signin');
}

async function handleUserSignUp(req, res) {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) return res.status(400).json({ message: 'invalid data' });

        const user = await User.create({
            username,
            email,
            password,
            role
        });

        console.log(user);
        return res.render('homepage');
    } catch (err) {
        console.log(err.message);
        return res.status(400).json({ message: err.message })

    }
}

//SIGN IN
async function handleGetSignInPage(req, res) {
    return res.render('signin');
}


async function handleUserSignIn(req, res) {
    try{
        const { email, password } = req.body;
        const user = User.matchPassword(email, password);
        
        return res.render('homepage');
    }catch(err){
        return res.render('signup');
    }
}

module.exports = {
    handleGetSignUpPage,
    handleUserSignUp,
    handleGetSignInPage,
    handleUserSignIn
}