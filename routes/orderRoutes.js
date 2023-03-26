const express = require("express");
const orderController = require("./../controllers/orderController");
const authController = require("./../controllers/authController");

const router = express.Router();

// GET all orders of a user
router.post(
  "/getuserorders",
  authController.requireAuth,
  orderController.getuserorders_post
);

router.post(
  "/cartorder",
  authController.requireAuth,
  orderController.cartOrder_post
);

// Restricted to admin //

//get all orders for all users
router.get(
  "/admin/getallorders",
  authController.requireAuth,
  authController.restrictTo,
  orderController.getOrders_post
);

// //GET a single order
// router.get("/:id", getorder);

// // POST a new order
// router.post("/", createorder);

// // DELETE a order
// router.delete("/:id", deleteorder);

// // UPDATE a order
// router.patch("/:id", updateorder);

// module.exports = router;

module.exports = router;
