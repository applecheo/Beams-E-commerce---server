const express = require("express");
const Order = require("../models/OrderSchema");
const Product = require("../models/ProductSchema");
const User = require("../models/UserSchema");
const router = express.Router();

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
    ).populate("orders", "products");
    const indexOfLatestOrderProducts = addOrderToUser.orders.length - 1;
    const latestOrderedProducts =
      addOrderToUser.orders[indexOfLatestOrderProducts].products;
    const updateProductToSold = await Product.updateMany(
      {
        _id: { $in: latestOrderedProducts },
      },
      { isSoldOut: true },
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
