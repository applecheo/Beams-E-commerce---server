const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    gender: { type: String, enum: ["Men", "Women"] },
    images: { type: [String] },
    size: {
      type: String,
      enum: [
        "S",
        "M",
        "L",
        "XL",
        "US5",
        "US6",
        "US7",
        "US8",
        "US9",
        "US10",
        "US11",
        "US5.5",
        "US6.5",
        "US7.5",
        "US8.5",
        "US9.5",
        "US10.5",
        "US11.5",
      ],
    },
    isSold: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
