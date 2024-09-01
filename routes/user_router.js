const express = require('express');
const Router = express.Router();
const {
    handleGetSignUpPage,
    handleUserSignUp
} = require('../controllers/user_controller');

Router.route('/signup')
.get(handleGetSignUpPage)
.post(handleUserSignUp)

Router.route('/signin')
.get(handleGetSignUpPage)
.post(handleUserSignUp)

module.exports = Router;