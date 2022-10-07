const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderID: { type: Number },
    orderedBy: { type: String }, //email if dh
    status: { type: String, default: "order received" },
    products: {
      type: [String],
    },
    shoeSize: {
      type: String,
    },
    clothingSize: {
      type: String,
      enum: ["xs", "s", "m", "l", "xl"],
    },
    quantity: { type: Number },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
