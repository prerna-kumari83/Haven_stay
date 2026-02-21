const express = require("express");
const router = express.Router();
const wrapAsync = require("../util/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingControllers = require("../controllers/listing.js");



const path = require("path");


const multer = require("multer");   // ✅ ADD THIS
const { storage } = require("../cloudConfig/cloudinary.js");
const upload = multer({ storage });

// Routes for "/" and "/new"
// GET / and POST /
router.route("/")
  .get(wrapAsync(listingControllers.index))
  .post(
    isLoggedIn,
    upload.single("listings[image]"),
    validateListing,
    wrapAsync(listingControllers.createListing)
  );

// GET /new - New Listing Form     
// This route is separate because its path is unique.
router.get("/new", isLoggedIn, listingControllers.newListing);

// Routes for "/:id"
// SHOW, UPDATE, and DELETE routes
router.route("/:id")
  .get(wrapAsync(listingControllers.showListing))
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingControllers.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingControllers.deleteListing)
  );

// GET /:id/edit - Edit Listing Form
// This route is also separate because its path is unique.
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingControllers.editListing)
);

module.exports = router;











// const express=require("express");
// const router=express.Router();

// const wrapAsync = require("../util/wrapAsync.js");




// const {isLoggedIn, isOwner}=require("../middleware.js");
// const {validateListing}=require("../middleware.js");

// const listingControllers=require("../controllers/listing.js");

// router.get(
//   "/",
//   wrapAsync(listingControllers.index)
// );

// //new route
// router.get("/new",isLoggedIn,listingControllers.newListing);

// //show route
// router.get(
//   "/:id",

//   wrapAsync(listingControllers.showListing)
// );

// // post route
// router.post(
//   "/",
//   isLoggedIn,
  
//   validateListing,
//   wrapAsync(listingControllers.createListing)
// );

// //edit route
// router.get(
//   "/:id/edit",
//   isLoggedIn,
  
//   isOwner,
//   wrapAsync(listingControllers.editListing)
// );

// //update route
// router.put(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   validateListing,
//   wrapAsync(listingControllers.updateListing)
// );

// //detele route
// router.delete(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listingControllers.deleteListing)
// );

// module.exports = router;