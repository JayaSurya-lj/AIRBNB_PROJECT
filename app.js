if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRoute = require("./routes/listing.js");
const reviewRoute = require("./routes/review.js");
const userRoute = require("./routes/user.js");
const searchRoute = require("./routes/search.js");
const { log } = require('console');

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));



// //LOGGER - MORGAN
// app.use((req, res, next) => {
//     req.time = new Date(Date.now()).toString();
//     console.log(req.method, req.path, req.hostname, req.time);
//     next();
// });

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main(){
    await mongoose.connect(dbUrl);
    // await mongoose.connect(MONGO_URL);
}

const checkAccess = ("/api",(req, res , next) =>{
    let {token} = req.query;
    if(token === "giveaccess"){
        next();
    }
    res.send("ACCESS DENIED!");
    
});

app.get("/api", checkAccess , (req, res) =>{
    res.send("data");
});

const store = MongoStore.create({
    // mongoUrl: MONGO_URL,
    mongoUrl: dbUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter: 24*3600,
});

store.on("error", () =>{
    console.log("ERROR IN MONGO SESSION STORE", err);
})

const sessionOptions = {
    store,
    secret:  process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true

    },
};

// app.get("/", (req, res) => {
//     res.send("Hi, I am root");
// });



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.get("/demouser", async(req, res) =>{
    let fakeUser = new User({
        email: "student@gmail.com",
        username: "delta-student"
    });
    let registeredUser = await User.register(fakeUser, "helloworld");
    res.send(registeredUser);
});


app.use("/", searchRoute);

//ROUTER FOR LISTING
app.use("/listings", listingRoute);

//ROUTER FOR LISTING
app.use("/listings/:id/reviews", reviewRoute);

//ROUTER FOR USER
app.use("/", userRoute);


// app.get("/testlisting", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India",
//     });
    
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successfully executed");
// });


//IF NOT MATCHED WITH ANY OTHER ROUTE
app.all("*", (req, res, next) =>{
    next(new ExpressError(404, "PAGE NOT FOUND!"));
})


app.use((err, req, res, next) =>{
    let {statusCode=500, message="SOMETHING WENT WRONG!"} = err;
    // res.status(statusCode).send(message);
    res.render("error.ejs", {err});
});

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});