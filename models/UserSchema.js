const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    watchList: [String],
    token: { type: String },
    orders: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Order",
      required: true,
    },
    // shoppingCart: { type: [String] },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
