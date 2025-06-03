const express = require('express');
const router = express.Router();
const User = require("../models/user.js")
const wrapAsync =require('../utils/wrapAsync.js');
const passport = require('passport');
let {savedRedirectUrl} = require("../middleware.js");


const userController = require("../controllers/users.js");


//signup
router.get("/signup", userController.renderSignupForm)
router.post("/signup", wrapAsync(userController.signup))

//login
router.get("/login", userController.renderLoginForm)
// passport.authenticate() -> check password is valid or not
router.post("/login",savedRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), wrapAsync(userController.login))

//logout
router.get("/logout", userController.logout)

module.exports =router;