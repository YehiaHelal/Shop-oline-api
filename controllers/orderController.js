const Order = require("../models/orderModel");
const mongoose = require("mongoose");

// create new user
const cartOrder_post = async (req, res) => {
  // console.log(req.body.Review);
  const { orderProducts, orderTotalValue, numberofitems } =
    req.body.OrderDetails; // from the req.body sent from the frontend

  // console.log(orderProducts, orderTotalValue);

  // console.log(req.current);

  // console.log(res.locals.user);

  // console.log(res.locals.user.email);

  try {
    const order = await Order.create({
      orderProducts,
      orderTotalValue,
      user: res.locals.user.email,
      numberofitems,
    });

    // console.log(order);

    res.status(200).json({ message: "order placed and on it's way" });
  } catch (error) {
    res.status(400).json({ error: "there was an error" });
  }
};

// get user orders
const getuserorders_post = async (req, res) => {
  const userorders = await Order.find({ user: res.locals.user.email });
  // console.log(userorders);

  // console.log(res.locals.user.email);

  // console.log(req.body.OrderDetails);
  // const { orderProducts, orderTotalValue } = req.body.OrderDetails; // from the req.body sent from the frontend

  // try {
  //   const order = await Order.create({
  //     orderProducts,
  //     orderTotalValue,
  //     user: res.locals.user.email,
  //   });

  res.status(200).json({ message: "all your orders", orders: userorders });
  // } catch (error) {
  //   res.status(400).json({ error: "there was an error" });
  // }
};

//get all orders for all users
const getOrders_post = async (req, res) => {
  const orders = await Order.find({}).sort({});

  // a normal cookie send
  // res.cookie("JWT-Test", false, { maxAge: 1000 * 60 * 60 * 24 }); - // setting the age for it to stay even if the browser was closed
  // 1000 milisecond * 60 sec * 60 minute * 24 hour

  res.status(200).json(orders); // res.status 200 means ok
};

module.exports = {
  cartOrder_post,
  getuserorders_post,
  getOrders_post,
};
