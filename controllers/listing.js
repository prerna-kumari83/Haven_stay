
const Listing = require("../models/listing");

module.exports.index=async (req, res) => {
    const listings = await Listing.find({});
    // console.log(listings);
 

    res.render("listings/index", { listings });
  }

  module.exports.newListing = (req, res) => {
    res.render("listings/new.ejs");
};


module.exports.showListing=async (req, res) => {
      const { id } = req.params;
      const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
      if(!listing){
        req.flash("error","🙅‍♂️listing is deleted!");
        return res.redirect("/listings");
      }
      console.log(listing);
      
      res.render("listings/show.ejs", { listing });
    }

    module.exports.createListing=async (req, res, next) => {
      console.log(req.body);
      console.log(req.file);
        const listing = new Listing(req.body.listings);
        listing.owner=req.user._id;
         if (req.file) {
    listing.image = req.file.path;   // 👈 SAVE IMAGE PATH
  }
        
        await listing.save();
        req.flash("success","listing is add");
        res.redirect("/listings");
        console.log(listing);
      }

      module.exports.editListing=async (req, res) => {
    const { id } = req.params;

    
    const listing = await Listing.findById(id);
    
    if(!listing){
      req.flash("error","🙅‍♂️listing is deleted!");
      return res.redirect("/listings");
    }
   
    res.render("listings/update.ejs", { listing });
  }

  module.exports.updateListing=async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listings });
    req.flash("success"," listing is updated!")
    res.redirect(`/listings/${id}`);
  }

  module.exports.deleteListing=async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
     req.flash("success","🚮 listing is deleted!")
    res.redirect("/listings");
  }
