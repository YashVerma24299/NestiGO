const express = require('express');
const router = express.Router();
const User = require("../models/user.js")
const wrapAsync =require('../utils/wrapAsync.js');
const passport = require('passport');
let {savedRedirectUrl} = require("../middleware.js");

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
            //Jese hi signup ho login hojaaiga
            req.login(registeredUser, (err)=>{
                if(err){
                    next(err);
                }else{
                    req.flash("success", "Welcome to NestiGo!")
                    res.redirect("/listings");      
                }
            })
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
router.post("/login",savedRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), wrapAsync( 
    async (req,res)=>{
        req.flash("success", "Welcome to NestiGo!")
        // res.redirect("/listings");

        let redirectUrl = res.locals.redirectUrl || "/listings"; // means agr m kissi path se nhi aaya tho,
        // means directly visit krrha hu website
        // means mjhe bss login krna hai -> frtho listings prhi jaaaungana
        res.redirect(redirectUrl);
    }
))

//logout
router.get("/logout", (req,res, next)=>{
    req.logout( (err)=>{
        if(err){
            next(err);
        }else{
            req.flash("success", "logout!");
            res.redirect("/listings");
        }
    });
})

module.exports =router;