const express = require('express');
const router = express.Router();
const User = require("../models/user.js")
const wrapAsync =require('../utils/wrapAsync.js');

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

module.exports =router;