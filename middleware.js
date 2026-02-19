const {listingsSchema, reviewsSchema}=require("./Schema.js");
const Listing=require("./models/listing.js");
const Review=require("./models/review.js");
const ExpressError = require("./util/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
if(!req.isAuthenticated()){
  req.session.redirectUrl=req.originalUrl;

    req.flash("error", "You must be logged in to create a listing.");
    return res.redirect("/login");
  }

  next();
}

module.exports.redirectUrlsave= (req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;

  }
  next();
}

module.exports.isOwner=async (req,res,next)=>{
  const { id } = req.params;
    const listing = await Listing.findById(id);
   
    if(!listing.owner.equals(req.user._id)){
      req.flash("error","🙅‍♂️You are not authorize to do this!");
      return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isAuthor=async (req,res,next)=>{
  const { id, reviewId } = req.params;
    const listing = await Listing.findById(id);
    const review = await Review.findById(reviewId);

    if( !review.author.equals(req.user._id)){
      req.flash("error","🙅‍♂️You are not authorize to do this!");
      return res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports.validateListing = (req, res, next) => {
  let { error } = listingsSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");

    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReviews = (req, res, next) => {
  let { error } = reviewsSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");

    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

