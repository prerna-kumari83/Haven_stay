require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initialData = require("./data.js");

async function seedHotels() {
  try {
    console.log("🔗 Connecting to Atlas...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected!");

    // Delete old listings (optional but recommended)
    await Listing.deleteMany({});
    console.log("🗑 Old listings deleted");

    const hotelsWithOwner = initialData.data.map(listing => ({
      ...listing
    }));

    const result = await Listing.insertMany(hotelsWithOwner);

    console.log(`✅ ${result.length} listings inserted!`);

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Done!");
  }
}

seedHotels();