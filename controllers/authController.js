// checking the data of the user , checking cookie and token , auth middleware checker for certain routes
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res
      .status(401)
      .json({ error: "You are not logged in! Please log in to get access." });
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_Secret);
  // console.log(decoded);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  // console.log(currentUser);
  if (!currentUser) {
    return res
      .status(401)
      .json({ error: "You are not logged in! Please log in to get access." });
  }

  // return res.status(200).json({ meesage: "u are in all good" });
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
};

const restrictTo = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "You do not have permission to perform this action" });
  }

  // console.log("u are permitted");

  next();
};

const checkToken_post = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res
      .status(401)
      .json({ error: "token expired or deprecated, but try to login again" });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_Secret);

    const currentUser = await User.findById(decoded.id);

    return res.status(200).json({ message: "all good" });
  } catch (error) {
    return res
      .status(401)
      .json({ error: "token expired or deprecated, but try to login again" });
  }
};

module.exports = { requireAuth, restrictTo, checkToken_post };
