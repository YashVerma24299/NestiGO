const Listing = require("../models/listing.js"); 

module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}

module.exports.renderNewForm = (req,res)=>{
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
}

module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({
        path:'reviews',
        populate:{
            path:"author",
        }
    }).populate('owner');
    if(!listing){
        req.flash("error", "Does not exist!");
        res.redirect("/listings");
    }else
    res.render("listings/show.ejs", {listing});
    // console.log(listing);
}

module.exports.createListing = async (req,res, next)=>{
    // let listing = req.body.listing;
    // console.log(listing)
    // await Listing.insertOne(listing);
    // res.redirect("/listings");

    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    await newlisting.save();
    req.flash("success", "New listing created!")
    res.redirect("/listings");
}

module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Does not exist!");
        res.redirect("/listings");
    }else 
    res.render("listings/edit.ejs", {listing});
} 

module.exports.updateListing = async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "Listing Updated!")
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!")
    res.redirect("/listings");
}