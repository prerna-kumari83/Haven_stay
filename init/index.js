const mongoose=require("mongoose");
const express = require('express');
const app = express();  

const Listing=require("../models/listing.js");

const initialData=require("./data.js");

main().then(()=>{
    console.log("database is connected...");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelBooking');

  
}


// const express = require('express');

// const initData=(async()=>{
//     await Listing.deleteMany({});
//     const initData = initialData.data.map((el) => {
//         return { ...el, owner:"688c9165c56dc27bbf615a8e" }
//     })
//     await Listing.insertMany(initData);
//     console.log("data is inserted");
// })
    
const initData = (async () => {
    await Listing.deleteMany({});
    initData.data = initialData.data.map((el) => (
        { ...el, owner: "68aa160acce11a0427747523"}
    ));
    await Listing.insertMany(initData.data );
    console.log("data is inserted");
});

initData().then(()=>{
    console.log("initial data is inserted");
}   
).catch(err => console.log(err));   