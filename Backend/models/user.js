const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required:true
    }
});

userSchema.plugin(passportLocalMongoose);
//passportLocalMongoose -> Automatically define the name and password

const User = model('User', userSchema);

module.exports = User;