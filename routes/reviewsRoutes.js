const express = require("express");
const authController = require("./../controllers/authController");
const reviewController = require("./../controllers/reviewController");

const router = express.Router();

// GET all reviews
router.get("/getuserreviews", reviewController.getUserReviews_post);

// push a review of a user
router.post(
  "/addreview",
  authController.requireAuth,
  reviewController.reviewPush_post
);

module.exports = router;
