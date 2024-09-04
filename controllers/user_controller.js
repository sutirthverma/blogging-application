const User = require('../models/user_model');
const {
    createTokenForUser
} = require('../services/authentication');


//SIGN UP
async function handleGetSignUpPage(req, res) {
    return res.render('signup');
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

        return res.redirect('signin');
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
        const token = await User.matchPasswordAndGenerateToken(email, password);
        const user = await User.findOne({email});

        return res.cookie('token', token).redirect('/');
    }catch(err){
        console.log(err.message);
        
        return res.render('signin', {
            error: "Incorrect email or password"
        });
    }
}

//SIGN OUT
async function handleUserSignOut(req, res) {
    return res.clearCookie('token').redirect('/');
}

module.exports = {
    handleGetSignUpPage,
    handleUserSignUp,
    handleGetSignInPage,
    handleUserSignIn,
    handleUserSignOut
}