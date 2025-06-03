const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError =require('./utils/ExpressError.js');
const { listingSchema}  = require('./schema.js');
const { reviewSchema}  = require('./schema.js');

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

module.exports.isOwner =async (req,res,next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You don't have permisssion to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

module.exports.isReviewAuthor = async(req, res, next) => {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}