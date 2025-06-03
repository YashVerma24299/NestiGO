const User = require("../models/user.js");

module.exports.renderSignupForm = (req,res)=>{
    res.render("./users/signup.ejs");
};

module.exports.signup = async (req,res)=>{
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
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login = async (req,res)=>{
    req.flash("success", "Welcome to NestiGo!")
    // res.redirect("/listings");

    let redirectUrl = res.locals.redirectUrl || "/listings"; // means agr m kissi path se nhi aaya tho,
    // means directly visit krrha hu website
    // means mjhe bss login krna hai -> frtho listings prhi jaaaungana
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res, next)=>{
    req.logout( (err)=>{
        if(err){
            next(err);
        }else{
            req.flash("success", "logout!");
            res.redirect("/listings");
        }
    });
}