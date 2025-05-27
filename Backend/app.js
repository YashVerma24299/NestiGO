const express = require('express');
const mongoose = require('mongoose');
const Listing = require('./models/listing.js')
const app = express();
const port = 8080;

app.listen(port, () =>{
    console.log('Server is running on port ' + port);
});

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
app.get('/testListing', async (req,res) =>{
    let sample = new Listing({
        title: 'My new Villa',
        description: 'A beautiful villa with a sea view',
        price: 1200,
        location: 'Panaji, Goa',
        country: 'India'
    })
    await sample.save();
    console.log("Sample listing saved");
    res.send("Successfull testing");
})