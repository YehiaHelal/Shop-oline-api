const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderProducts: { type: [String], required: true },
    orderTotalValue: { type: Number, required: true },
    user: { type: String, required: true },
    numberofitems: { type: [] },
  },
  { timestamps: true }
);

orderSchema.pre("save", async function (next) {
  next(); // this pointing to the function which is pointing to the document being saved
});

module.exports = mongoose.model("Order", orderSchema);
