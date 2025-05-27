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




app.get('/', (req,res)=>{
    res.send("Root")
})
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
app.get('/listings', async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
})
//show Route specific listing
app.get('/listings/:id', async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
})