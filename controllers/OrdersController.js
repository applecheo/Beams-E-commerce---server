const express = require("express");
const Order = require("../models/OrderSchema");
const User = require("../models/UserSchema");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("orders");

    res.status(201).send(user);
    // console.log(orderDetails);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/detail/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const productDetails = await Order.findById(id).populate("products");
    res.status(201).send(productDetails);
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
