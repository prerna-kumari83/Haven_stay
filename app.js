require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");

const methodOverride = require("method-override");

app.use(express.json());

const session = require("express-session");

const ExpressError = require("./util/ExpressError.js");

const listingsRouter = require("./routes/listings.js");
const userRouter = require("./routes/user.js");
const reviewsRouter = require("./routes/reviews.js");
const User = require('./models/user');

const flash = require("connect-flash");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsMate); // Use ejsMate for layout support


const sessionOptions = {
  secret: 'secretcodeisstrong',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
    maxAge: 1000 * 60 * 60 * 24 * 3,
    httpOnly: true

  }
}

app.use(session(sessionOptions));
app.use(flash());

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure LocalStrategy
passport.use(new LocalStrategy(User.authenticate())); // If using passport-local-mongoose

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});


const Listing = require("./models/listing");
const Review = require("./models/review.js");


main()
  .then(() => {
    console.log("database is connected...");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
}


// app.use("/api", (req, res, next) => {
//   let { token } = req.query;
//   if (token == "access") {
//     console.log("access");
//     return next();
//   }

//   next(new Error("not authicate!"));
// });
// app.get("/api",(req,res)=>{
//   res.send("access given!");
// })



app.get("/test", async (req, res) => {
  const newUser = new User({ email: "test@example.com", username: "testuser", password: "password123" });

  const registeredUser = await User.Register(newUser, "pouny");
  res.send(registeredUser);
})

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

//index route

app.use("/listings", listingsRouter);

app.use("/listings/:id/reviews", reviewsRouter)
app.use("/", userRouter);


//post for reviews

// app.use((err, req, res, next) => {
//   console.log("this is error middleware...");
//   next(err);
// });

app.all("/*splat", (req, res, next) => {
  next(new ExpressError(404, "Page not found 😜..."));
});

app.use((err, req, res, next) => {
  let {
    statusCode = 500,
    message = "something went out wrong ! please wait!",
  } = err;
  res.render("listings/error.ejs", { message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
