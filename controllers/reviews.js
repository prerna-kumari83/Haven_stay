const Listing = require("../models/listing");
const Review = require("../models/review.js");


module.exports.createReview=async (req, res) => {

  const listing = await Listing.findById(req.params.id);
  const newReview = new Review(req.body.review);

  listing.reviews.push(newReview);
  newReview.author = req.user._id;
  await listing.save();
  await newReview.save();
  console.log(newReview);
  req.flash("success","📃review is add!✅")
  res.redirect(`/listings/${req.params.id}`);
}

module.exports.deleteReview=async(req,res)=>{
  let {id,reviewId}=req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`);

}