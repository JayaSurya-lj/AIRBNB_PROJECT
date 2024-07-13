const express = require("express");
const router = express.Router({mergeParams: true});

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {isLoggedIn, isOwner, validateReview, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");


//REVIEW
//POST REVIEW ROUTE
router.post("/", isLoggedIn ,validateReview , wrapAsync(reviewController.addReview));

//DELETE REVIEW ROUTE
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports = router;