const express = require('express');
const Router = express.Router();
const {
    handleGetSignUpPage,
    handleUserSignUp,
    handleGetSignInPage,
    handleUserSignIn
} = require('../controllers/user_controller');

Router.route('/signup')
.get(handleGetSignUpPage)
.post(handleUserSignUp)

Router.route('/signin')
.get(handleGetSignInPage)
.post(handleUserSignIn)

module.exports = Router;