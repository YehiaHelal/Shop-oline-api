const express = require("express");
const {
  getItem,
  getItems,
  createItem_post,
  deleteItem_post,
  updateItem_post,
} = require("./../controllers/itemController");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();

// GET all Items
router.get("/", getItems);

//GET a single Item
router.get("/:id", getItem);

// for admin  //

// POST a new Item //
router.post(
  "/",
  authController.requireAuth,
  authController.restrictTo,
  createItem_post
);

// DELETE a Item //
router.delete(
  "/:id",
  authController.requireAuth,
  authController.restrictTo,
  deleteItem_post
);

// UPDATE a Item //
router.patch(
  "/:id",
  authController.requireAuth,
  authController.restrictTo,
  updateItem_post
);

module.exports = router;
