const express = require('express');
const router = express.Router();
const User = require("../models/user.js")
const wrapAsync =require('../utils/wrapAsync.js');
const passport = require('passport');

//signup
router.get("/signup", (req,res)=>{
    res.render("./users/signup.ejs");
})
router.post("/signup", wrapAsync( 
    async (req,res)=>{
        try{
            let {username, email, password} =req.body;
            let newuser = new User({email, username});
            let registeredUser = await User.register(newuser, password);
            req.flash("success", "Welcome to NestiGo!")
            res.redirect("/listings");
        }catch(e){
            req.flash("error",e.message);
            res.redirect("/signup");
        }
    }
))

//login
router.get("/login", (req,res)=>{
    res.render("users/login.ejs");
})
// passport.authenticate() -> check password is valid or not
router.post("/login", passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), wrapAsync( 
    async (req,res)=>{
        req.flash("success", "Welcome to NestiGo!")
        res.redirect("/listings");
    }
))

module.exports =router;