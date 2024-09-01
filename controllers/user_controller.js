const User = require('../models/user_model');

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

        console.log(user);
        return res.render('homepage');
    } catch (err) {
        console.log(err.message);
        return res.status(400).json({ message: err.message })

    }
}

//SIGN IN
async function handleGetSignIpPage(req, res) {
    return res.render('homepage');
}

async function handleUserSignIn(req, res) {

}

module.exports = {
    handleGetSignUpPage,
    handleUserSignUp
}