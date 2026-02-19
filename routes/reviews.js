const express=require("express");

const router=express.Router({mergeParams:true});
const wrapAsync = require("../util/wrapAsync.js");


const validateReviews = require("../middleware.js").validateReviews;

const {isLoggedIn,isAuthor}=require("../middleware.js")

const reviewsController=require("../controllers/reviews.js")


router.post("/",isLoggedIn,validateReviews, wrapAsync(reviewsController.createReview ));


// delete review route
router.delete("/:reviewId",isLoggedIn,isAuthor, wrapAsync(reviewsController.deleteReview));


module.exports = router;