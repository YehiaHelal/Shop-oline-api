const Review = require("../models/reviewModel");
const mongoose = require("mongoose");

// create new user
const reviewPush_post = async (req, res) => {
  // console.log(req.body.reviewdetails);
  const { review, item } = req.body.reviewdetails; // from the req.body sent from the frontend
  const user = res.locals.user.email;

  // console.log(req.body.reviewdetails);
  // console.log(review, tour);

  // console.log(orderProducts, orderTotalValue);

  // console.log(req.current);

  // console.log(res.locals.user);

  // console.log(res.locals.user.email);

  const reviewMade = await Review.create({
    review,
    item,
    user,
  });

  if (reviewMade) {
    res.status(200).json({ message: "review added" });
  } else {
    // console.log(order);
    res.status(400).json({ error: "there was an error" });
  }
};

// get user orders
const getUserReviews_post = async (req, res) => {
  const allUserReviews = await Review.find({});
  // console.log(allUserReviews);

  // console.log(req.body.OrderDetails);
  // const { orderProducts, orderTotalValue } = req.body.OrderDetails; // from the req.body sent from the frontend

  // try {
  //   const order = await Order.create({
  //     orderProducts,
  //     orderTotalValue,
  //     user: res.locals.user.email,
  //   });

  res.status(200).json({ message: "all your reviews", Review: allUserReviews });
  // } catch (error) {
  //   res.status(400).json({ error: "there was an error" });
  // }
};

module.exports = {
  reviewPush_post,
  getUserReviews_post,
};
