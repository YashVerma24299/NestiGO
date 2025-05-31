const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const Listing = require('./models/listing.js')

//express
app.listen(port, () =>{
    console.log('Server is running on port ' + port);
});

// monogodb
const mongo_url = 'mongodb://127.0.0.1:27017/nestigo';
async function main(){
    //"NestiGo" is a blend of two words:
    //Nest – symbolizes home, comfort, a safe place to stay.
    //Go – conveys travel, mobility, exploration.
    await mongoose.connect(mongo_url);
}
main()
    .then((res) =>{
        console.log("Connected to MongoDB successfully");
    }) 
    .catch((err) =>{
        console.log(err);
    });

//for ejs
const path = require('path');
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));

//method-override
const methodOverride = require('method-override');
app.use(methodOverride("_method"));

//ejs-mate also prefer include/partial
//it  used for repetetive code in ejs files
//like header, footer, navbar etc.
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));


//  used for error handling in async functions
const wrapAsync =require('./utils/wrapAsync.js');
const ExpressError =require('./utils/ExpressError.js');

// listingSchema and reviewSchema
const { listingSchema, reviewSchema}  = require('./schema.js');

//Review Schema
const Review = require('./models/review.js');







app.get('/', (req,res)=>{
    res.send("Root")
})

const validateListing = (req, res, next) => {
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

// app.get('/testListing', async (req,res) =>{
//     let sample = new Listing({
//         title: 'My new Villa',
//         description: 'A beautiful villa with a sea view',
//         price: 1200,
//         location: 'Panaji, Goa',
//         country: 'India'
//     })
//     await sample.save();
//     console.log("Sample listing saved");
//     res.send("Successfull testing");
// })
app.get('/listings', wrapAsync(async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}));
//add new Route for specific listing 
app.get('/listings/new',  (req,res)=>{
    res.render("listings/new.ejs");
})
app.post('/listings', validateListing , wrapAsync(async (req,res, next)=>{
    // let listing = req.body.listing;
    // console.log(listing)
    // await Listing.insertOne(listing);
    // res.redirect("/listings");

    const newlisting = new Listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
}));

//show Route specific listing
app.get('/listings/:id',wrapAsync( async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate('reviews');
    res.render("listings/show.ejs", {listing});
}));
//edit route
app.get('/listings/:id/edit', wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
}));
//update route
app.put('/listings/:id',validateListing, wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));
//delete route
app.delete('/listings/:id', wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));



// Reviews
const validateReview = (req, res, next) => {
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}
app.post('/listings/:id/reviews', validateReview, wrapAsync(
    async (req,res) =>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    // console.log("Review added successfully");
    // res.send("Review added successfully");
    res.redirect(`/listings/${listing._id}`);
}));
//delete
app.delete('/listings/:id/reviews/:reviewId', wrapAsync(async (req,res)=>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findById(reviewId);
    res.redirect(`/listings/${id}`);
}));





//error handling
// app.all('*', (req, res, next) => {
//     next(new ExpressError(404, 'Page Not Found'));
// });
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
});
