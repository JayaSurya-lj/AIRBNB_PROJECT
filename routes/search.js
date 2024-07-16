const express = require("express");
const router = express.Router({mergeParams: true});

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

router.get("/listings/search", wrapAsync( async(req, res) =>{
    const {query} = req.query;
    console.log(query);
    try {
        const allListings = await Listing.find({
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { location: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
            { country: { $regex: query, $options: 'i' } }
          ],
        });
        // console.log(allListings);
        res.render('listings/index.ejs', { allListings });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}));

router.get("/listings/suggestions", wrapAsync(async (req, res) => {
    const { query } = req.query;
    try {
        const suggestions = await Listing.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { location: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { country: { $regex: query, $options: 'i' } }
            ]
        }).limit(10); // Limit the number of suggestions returned
        res.json(suggestions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}));

// Assuming you have already set up your Express app and imported necessary modules

// Define your route
router.get("/listings/category", wrapAsync(async (req, res) => {
  try {
      const category = req.query.q; // Retrieve the category from query parameter 'q'
      
      // Assuming you have a function to fetch listings based on the category
      const allListings = await Listing.find({ categories: category });

      // Render your template (e.g., index.ejs) with the listings data
      res.render('listings/index.ejs', { allListings });

  } catch (err) {
      // Handle any errors
      console.error("Error fetching listings:", err);
      res.status(500).send("Error fetching listings. Please try again later.");
  }
}));


module.exports = router;