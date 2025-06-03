const express = require('express');
const router = express.Router();
const wrapAsync =require('../utils/wrapAsync.js');
const ExpressError =require('../utils/ExpressError.js');
const { listingSchema}  = require('../schema.js');
const Listing = require('../models/listing.js')
const {isLoggedIn} =require("../middleware.js");


const validateListing = (req, res, next) => {
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

//Index Route
router.get('/', wrapAsync(async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}));

//New Route
router.get('/new', isLoggedIn, (req,res)=>{
    // if(!req.isAuthenticated()){
    //     // If user is not registerd
    //     // then, it handle them
    //     req.flash("error", "You must be login!");
    //     res.redirect("/login");
    //     // These logic is valid for update delte, review
    //     // Make a middleware to these logic
    //     // Middleware =isLoggedIn
    // }else
    res.render("listings/new.ejs");
})

//show Route
router.get('/:id',wrapAsync( async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate('reviews').populate('owner');
    if(!listing){
        req.flash("error", "Does not exist!");
        res.redirect("/listings");
    }else
    res.render("listings/show.ejs", {listing});
    // console.log(listing);
}));

//Create Route
router.post('/', validateListing , wrapAsync(async (req,res, next)=>{
    // let listing = req.body.listing;
    // console.log(listing)
    // await Listing.insertOne(listing);
    // res.redirect("/listings");

    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    await newlisting.save();
    req.flash("success", "New listing created!")
    res.redirect("/listings");
}));

//edit route
router.get('/:id/edit',isLoggedIn, wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Does not exist!");
        res.redirect("/listings");
    }else 
    res.render("listings/edit.ejs", {listing});
}));

//update route
router.put('/:id',isLoggedIn,validateListing, wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "Listing Updated!")
    res.redirect(`/listings/${id}`);
}));

//delete route
router.delete('/:id',isLoggedIn, wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!")
    res.redirect("/listings");
}));

module.exports = router;