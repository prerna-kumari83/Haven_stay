


const User=require("../models/user.js");

module.exports.signupform=async(req,res)=>{
    res.render("user/signup.ejs");
}   


module.exports.signup=async(req,res)=>{
    const {email,username,password}=req.body;

   try{
     const newUser=new User({
        username,
        email,
      })
    const newData=await User.register(newUser,password); 

    req.login(newData, (err) => {
      if (err) {  
        req.flash("error", err.message);
        return res.redirect("/listings");
      }
      req.flash("success", "Account created successfully!");
      res.redirect("/listings");
    });
   }catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
   }
}

module.exports.formlogin=async(req,res)=>{
  res.render("user/login.ejs");
}


module.exports.postLogin=async(req,res)=>{
  req.flash("success", "Welcome back!");
  const redirectUrl= res.locals.redirectUrl || "/listings";

  res.redirect(redirectUrl);
};


module.exports.logout=(req,res,next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }

    req.flash("success","Goodbye!");
    res.redirect("/listings");
  });
}
