// require("dotenv").config();
// const mongoose = require("mongoose");
// const Listing = require("../models/listing.js");
// const initialData = require("./data.js");

// const ATLAS_URI = "mongodb+srv://haven_stay:3w45erdtfyghbjn@cluster0.qaydjif.mongodb.net/?retryWrites=true&w=majority";

// async function seedHotels() {
//   try {
//     console.log("🔗 Connecting to Atlas...");
//     await mongoose.connect(ATLAS_URI, {
//       serverSelectionTimeoutMS: 10000,
//       socketTimeoutMS: 45000
//     });
//     console.log("✅ Connected!");
    
//     // SKIP deleteMany - just insert (creates new docs)
//     const hotelsWithOwner = initialData.data.map(listing => ({
//       ...listing,
//       owner: "68aa160acce11a0427747523"
//     }));
    
//     const result = await Listing.insertMany(hotelsWithOwner, { timeout: 30000 });
//     console.log(`✅ SUCCESS! ${result.length} hotels added!`);
    
//   } catch (error) {
//     console.error("❌ Insert error:", error.message);
//   } finally {
//     await mongoose.connection.close();
//     console.log("🔌 Done!");
//   }
// }

// seedHotels();


require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initialData = require("./data.js");


const ATLAS_URI = process.env.MONGODB_URI;


async function seedHotels() {
  try {
    console.log("🔗 Connecting to Atlas...");
    await mongoose.connect(ATLAS_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000
    });
    console.log("✅ Connected!");

    // 1. Delete all existing listings
    await Listing.deleteMany({});
    console.log("🗑️ Previous listings deleted.");

    // 2. Add owner field to each listing
    const ownerId = "69976ca9a9dcaaadd0e3c40b"; // prerna's _id
    const hotelsWithOwner = initialData.data.map(listing => ({
      ...listing,
      owner: ownerId
    }));

    // 3. Insert new listings
    const result = await Listing.insertMany(hotelsWithOwner, { timeout: 30000 });
    console.log(`✅ SUCCESS! ${result.length} hotels added!`);

  } catch (error) {
    console.error("❌ Insert error:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Done!");
  }
}

seedHotels();