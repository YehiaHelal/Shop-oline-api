const { Router } = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = Router();

// so this is esstenailly the middle-ware which is between the frontend React and The Backend DB

// router.get("/signup", ); // to get some info from the backend DB   // we can set the function here or we add the controller for cleaner code

router.post("/signup", userController.createUser_post);

router.post("/checktoken", authController.checkToken_post);

router.post("/login", userController.loginUser_post);

router.post("/logout", userController.logoutUser_post);

router.post(
  "/profile",
  authController.requireAuth,
  userController.profileDataGet_post
);

router.post(
  "/updateinfo",
  authController.requireAuth,
  userController.updateUser_post
);

// Restricted to admin //

//get all users
router.get(
  "/admin/getallusers",
  authController.requireAuth,
  authController.restrictTo,
  userController.getUsers_post
);

//delete user
router.post(
  "/admin/getallusers",
  authController.requireAuth,
  authController.restrictTo,
  userController.deleteUser_post
);

module.exports = router;
