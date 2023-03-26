const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    item: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Number },
    title: { type: String },
    publisher: { type: String },
    image: { type: String },
    numberofitem: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
