const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding.js");
const maxToken = "pk.eyJ1IjoiamF5YXN1cnlhLWxqIiwiYSI6ImNseWVrdWprMDAzc24yanNiZ3l5NDE4bW0ifQ.Im-ajtLLJjkLQsZXyJy4ug";
const geocodingClient = mbxGeocoding({accessToken: maxToken});

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const MONGO_URL = "mongodb+srv://jayasuryalj:XPpBJR6XWGD9Auo8@cluster0.ccatzq7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

  async function main() {
    try {
      await mongoose.connect(MONGO_URL, {
        serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
      });
      console.log("Connected to DB");
    } catch (err) {
      console.error("Error connecting to the database", err);
    }
  }
  

const createListing = async (listing) => {
  // let {title, description, image, price, country, location} = req.body;
  // const newListing = req.body.listing;

  let response = await geocodingClient
  .forwardGeocode({
      query: listing.location,
      limit: 1
    })
      .send();

  // console.log(response.body.features[0].geometry);

  const newListing = new Listing(listing);

  newListing.geometry = response.body.features[0].geometry;
  await newListing.save();
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj, owner: "6692b11385cc7a9d629e724c"}));
  for(let listdata of initData.data){
    await createListing(listdata);
  }
  console.log("data was initialized");
};

initDB();