const User = require("../models/user.js");
const express = require("express");
const wrapAsync = require("../util/wrapAsync");
const router = express.Router();
const passport = require("passport");
const { redirectUrlsave } = require("../middleware"); // Assuming redirectUrlsave is in middleware and exported correctly

const usersController = require("../controllers/users.js");

// Group GET and POST for /signup
router.route("/signup")
    .get(wrapAsync(usersController.signupform))
    .post(wrapAsync(usersController.signup));

// Group GET and POST for /login
router.route("/login")
    .get(wrapAsync(usersController.formlogin))
    .post(
        redirectUrlsave,
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: '/login'
        }),
        usersController.postLogin
    );

// The original commented-out block
// router.get("/login", async(req,res)=>{
//     req.flash("success","Welcome back!");
//   res.render("user/login.ejs");
//   res.redirect("/listings");
// })

router.get("/logout", usersController.logout);

module.exports = router;




// const User=require("../models/user.js");

// const express=require("express");
// const wrapAsync = require("../util/wrapAsync");

// const router=express.Router();
// const passport=require("passport"); 
// const redirectUrlsave=require("../middleware").redirectUrlsave;

// const usersController=require("../controllers/users.js");

// router.get("/signup",wrapAsync(usersController.signupform));


// router.post("/signup",wrapAsync(usersController.signup))

// // router.get("/login", async(req,res)=>{
// //     req.flash("success","Welcome back!");
// //   res.render("user/login.ejs");
// //   res.redirect("/listings");
// // })  
// router.get("/login", wrapAsync(usersController.formlogin));

// router.post("/login",redirectUrlsave,passport.authenticate("local",{failureFlash:true,failureRedirect: '/login' }), usersController.postLogin);


// router.get("/logout",usersController.logout);


// module.exports=router;