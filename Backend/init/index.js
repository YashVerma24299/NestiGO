const mongoose = require('mongoose');
const initdata = require('./data.js');
const Listing = require('../models/listing.js');

const mongo_url = 'mongodb://127.0.0.1:27017/nestigo';
async function main(){
    await mongoose.connect(mongo_url);
}
main()
    .then((res) =>{
        console.log("Connected to MongoDB successfully");
    }) 
    .catch((err) =>{
        console.log(err);
    });

const initDB = async () => {
    await Listing.deleteMany({});
    // All data m owner assign krna mehnat ka kaam hai
    // Use predefined data in "User Model"

    // _id -> 683e9cc26391d86f290b654a
    // email -> "yash@gmail.com"
    // username -> "yashverma"
    // salt -> "21da792be07376b57d9f6a8ca71dbd478aad10760349f2d4917c6d2b2bc079d0"
    // hash -> "6dce17a56201372cbb56169503cff43693e7e94287fd45fd1ea8cd55fce57fdecf958c…"
    // __v -> 0

    //agr ye delete hogya tho,
    //new bnakrrr, yha aakr update krdena.....
    initdata.data = initdata.data.map((obj) => ({
        ...obj,
        owner: "683e9cc26391d86f290b654a",
    }));
    await Listing.insertMany(initdata.data);
    console.log("Database initialized with sample data");
}
initDB(); 