const { ref } = require('joi');
const mongoose =require('mongoose');

const Review = require('./review');
// const { Schema } = mongoose;


let listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:  true,  
       
    },
    description:{
        type:String,
       
    },
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1590698933947-a202b069a861?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D",
        set:(v)=>v===""?"https://images.unsplash.com/photo-1590698933947-a202b069a861?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D":v
    },
    price:{
        default:0,
        type:Number,
      
    },
    location:{
        type:String,
        
    },
    country:{
        type:String,
        
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,  
            ref:"Review",       //model name
        }
    ],

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})


listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
})

let Listing=new mongoose.model("Listing",listingSchema);

module.exports=Listing;