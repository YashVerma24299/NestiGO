module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        // If user is not registerd
        // then, it handle them
        req.flash("error", "You must be login!");
        return res.redirect("/login");
        // These logic is valid for update delte, review
        // Make a middleware to these logic
    }
    next(); 
}