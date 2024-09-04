const express = require('express');
const Router = express.Router();
const {
    handleGetSignUpPage,
    handleUserSignUp,
    handleGetSignInPage,
    handleUserSignIn,
    handleUserSignOut
} = require('../controllers/user_controller');

Router.route('/signup')
.get(handleGetSignUpPage)
.post(handleUserSignUp)

Router.route('/signin')
.get(handleGetSignInPage)
.post(handleUserSignIn)

Router.route('/signout')
.get(handleUserSignOut)

module.exports = Router;