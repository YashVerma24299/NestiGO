const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');

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

// used for error handling in async functions
const ExpressError =require('./utils/ExpressError.js');

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
app.get('/', (req,res)=>{
    res.send("Root")
})


// For listing routes
const listings = require('./routes/listing.js');
app.use('/listings', listings);

// For review routes
const reviews = require('./routes/review.js');
app.use('/listings/:id/reviews', reviews);


//error handling
// app.all('*', (req, res, next) => {
//     next(new ExpressError(404, 'Page Not Found'));
// });
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
});
