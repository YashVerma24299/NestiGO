module.exports.isLoggedIn = (req,res,next) =>{
    // if(!req.isAuthenticated()){
    //     // If user is not registerd
    //     // then, it handle them
    //     req.flash("error", "You must be login!");
    //     return res.redirect("/login");
    //     // These logic is valid for update delte, review
    //     // Make a middleware to these logic
    // }
    // next(); 
    if(!req.isAuthenticated()){
        // user jiss bhi path ko access krna chata hai usko yha store kralo
        // fr jese hi login hojaai 
        // usse vaapas ussi url pr bhejdo
        // uske liyy "redirectUrl" varible banaya haiiii
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be login!");
        return res.redirect("/login");
    }
    next();
}

// session -> can be reset.
// locals -> no reset option and accessible anywhere.

module.exports.savedRedirectUrl = (req,res, next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl =req.session.redirectUrl;
    }
    next();
}