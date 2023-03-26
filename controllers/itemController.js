const Item = require("../models/itemModel");
const mongoose = require("mongoose");

// get all items

const getItems = async (req, res) => {
  const items = await Item.find({}).sort({});

  res.status(200).json(items); // res.status 200 means ok
};

// get a single item

const getItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such item" });
  }

  const item = await Item.findById(id);

  if (!item) {
    return res.status(404).json({ error: "No such item" });
  }

  res.status(200).json(item);
};

// create new item
const createItem_post = async (req, res) => {
  const { name, price, image } = req.body;

  // here we are using de-structing assigning name and email and password to , from the request body we got.

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!price) {
    emptyFields.push("email");
  }
  if (!image) {
    emptyFields.push("password");
  }

  if (emptyFields > 0) {
    return res
      .status(400)
      .json({ error: "please fill in all the fields", emptyFields });
  }

  try {
    const item = await Item.create({ name, price, image });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a item

const deleteItem_post = async (req, res) => {
  const { id } = req.params;

  // so avoid  id } = req.params.id ?!

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such item" });
  }

  const item = await Item.findOneAndDelete({ _id: id });

  if (!item) {
    return res.status(400).json({ error: "No such item" });
  }

  res.status(200).json(item);
};

// update a item

const updateItem_post = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such item" });
  }

  const item = await Item.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!item) {
    return res.status(400).json({ error: "No such item" });
  }

  res.status(200).json(item);
};

module.exports = {
  getItem,
  getItems,
  createItem_post,
  deleteItem_post,
  updateItem_post,
};
