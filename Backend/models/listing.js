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
        default: "https://www.google.com/imgres?q=copyright%20images%20beach%20view&imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F1449767%2Fpexels-photo-1449767.jpeg%3Fcs%3Dsrgb%26dl%3Dpexels-asadphoto-1449767.jpg%26fm%3Djpg&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeach%2F&docid=lRh4RnRHr183RM&tbnid=8QZ2psdDFpZXdM&vet=12ahUKEwjG87Cng8ONAxXX3TgGHcB_Fn0QM3oECGoQAA..i&w=3676&h=2451&hcb=2&ved=2ahUKEwjG87Cng8ONAxXX3TgGHcB_Fn0QM3oECGoQAA",
        set:(v)=> v===" " ? "https://www.google.com/imgres?q=copyright%20images%20beach%20view&imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F1449767%2Fpexels-photo-1449767.jpeg%3Fcs%3Dsrgb%26dl%3Dpexels-asadphoto-1449767.jpg%26fm%3Djpg&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeach%2F&docid=lRh4RnRHr183RM&tbnid=8QZ2psdDFpZXdM&vet=12ahUKEwjG87Cng8ONAxXX3TgGHcB_Fn0QM3oECGoQAA..i&w=3676&h=2451&hcb=2&ved=2ahUKEwjG87Cng8ONAxXX3TgGHcB_Fn0QM3oECGoQAA" : v
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
})
const Listing = model ("Listing", listingSchema);
module.exports = Listing;