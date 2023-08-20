const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

const orderSchema = new mongoose.Schema(
  {
    orderedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: { type: String, default: "Order Received" },
    products: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
      required: true,
    },
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

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
        "One Size",
      ],
    },
    isSoldOut: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, default: "Male", enum: ["Male", "Female"] },
    wishList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
      required: true,
    },
    orders: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Order",
    },
  },
  { timestamps: true }
);

let dbModel = {};

dbModel.getUser = async () => {
  try {
    mongoose.connect(MONGO_URL);
    return mongoose.model("User", userSchema);
  } catch (err) {
    let error = new Error("Could not connect to database");
    error.status = 500;
    throw error;
  }
};

dbModel.getProduct = async () => {
  try {
    mongoose.connect(MONGO_URL);
    return mongoose.model("Product", productSchema);
  } catch (err) {
    let error = new Error("Could not connect to database");
    error.status = 500;
    throw error;
  }
};

dbModel.getOrder = async () => {
  try {
    mongoose.connect(MONGO_URL);
    return mongoose.model("Order", orderSchema);
  } catch (err) {
    let error = new Error("Could not connect to database");
    error.status = 500;
    throw error;
  }
};
module.exports = dbModel;
