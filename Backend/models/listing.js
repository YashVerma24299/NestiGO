const mongoose = require('mongoose');
const { Schema,model } = mongoose;

const listingSchema =new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
            type: String,
            default: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww",
            set: (v) => v && v.trim() !== "" ? v : "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww"
        },
    price: {
        type: Number,
        // required: true
    },
    location: {
        type: String,
        // required: true
    },
    country: {
        type: String,
        // required: true
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
})
const Listing = model ("Listing", listingSchema);
module.exports = Listing;