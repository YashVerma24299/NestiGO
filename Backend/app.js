const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const path = require('path'); //ejs
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require("express-session");
const flash = require("connect-flash");
const passport =require("passport"); // Passport's sole purpose is to authenticate requests,
const LocalStrategy =require("passport-local")
const User = require('./models/user.js');

//for ejs
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));

//method-override
app.use(methodOverride("_method"));

//ejs-mate also prefer include/partial
//it  used for repetetive code in ejs files
//like header, footer, navbar etc.
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


// Using Session adding cookie and many more.....
const sessionOptions ={
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }
}
app.use(session(sessionOptions));


// connect-flash
app.use(flash());
app.use((req,res,next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})


//error handling
// app.all('*', (req, res, next) => {
//     next(new ExpressError(404, 'Page Not Found'));
// });
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
});


//passport -> for Login/signup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.get("/demouser", async (req,res) =>{
//     let fakeUser = new User({
//         email: "yash@gmail.com",
//         username: "Yashh"
//     })
//     let registeredUser = await User.register(fakeUser, "QWERTY");
//     //QWERTY is a password
//     res.send(registeredUser);
// })



// For listing routes
const listingRouter = require('./routes/listing.js');
app.use('/listings', listingRouter);

// For review routes
const reviewRouter = require('./routes/review.js');
app.use('/listings/:id/reviews', reviewRouter);

// For user routes
const userRouter = require('./routes/user.js');
app.use('/', userRouter);