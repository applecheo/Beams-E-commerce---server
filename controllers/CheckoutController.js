const express = require("express");
const Order = require("../models/OrderSchema");
const Product = require("../models/ProductSchema");
const User = require("../models/UserSchema");
const router = express.Router();

const HasToken = async (req, res, next) => {
  const bearer = req.get("Authorization");
  const token = bearer.split(" ")[1];

  try {
    const payload = jwt.verify(token, TOKEN);
    const user = await User.findById(payload.userId);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: "Please Login" });
    }
  } catch (error) {
    res.status(401).send({ error });
  }
};

router.post("/", (req, res) => {
  const newOrder = req.body;
  const { products, orderedBy } = req.body;
  if (products.length === 0 || orderedBy === "") {
    res.status(500).send({ error });
  } else {
    Order.create(newOrder, (error, order) => {
      if (error) {
        res.status(500).send({ error });
      } else {
        res.status(201).send(order);
      }
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const orderDetails = await Order.findById(id);
    res.status(201).send(orderDetails);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;
  try {
    const addOrderToUser = await User.findByIdAndUpdate(
      id,
      { $addToSet: { orders: body } },
      {
        new: true,
      }
    );
    res.status(201).send(addOrderToUser);
  } catch (error) {
    res.status(400).send({ error });
  }
});
module.exports = router;
