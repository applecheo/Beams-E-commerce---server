const express = require("express");
const HasToken = require("../middleware");
const Order = require("../models/OrderSchema");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const Product = require("../models/ProductSchema");
const User = require("../models/UserSchema");

const router = express.Router();

router.post("/", HasToken, (req, res) => {
  const newOrder = req.body;
  const { products, orderedBy } = req.body;
  if (products.length === 0 || orderedBy === "") {
    res.status(500).send({ error: "error" });
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

router.put("/", HasToken, async (req, res) => {
  const { id } = req.query;
  const userId = req.body._id;
  const session = await stripe.checkout.sessions.retrieve(id, {
    expand: ["line_items"],
  });
  const product_name = session.line_items.data.map((x) => x.description);

  if (session.payment_status === "paid") {
    try {
      const products = await Product.find({
        $and: [{ name: { $in: product_name } }, { isSoldOut: false }],
      });
      const productIds = products.map((product) => product._id);
      const order = await Order.findOneAndUpdate(
        { $and: [{ products: { $in: [productIds] } }, { orderedBy: userId }] },
        { paid: true },
        {
          new: true,
        }
      );
      await Product.updateMany(
        {
          _id: { $in: productIds },
        },
        { isSoldOut: true },
        {
          new: true,
        }
      );

      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { orders: order._id } },
        {
          new: true,
        }
      );
      res.status(201).send({ message: "success" });
    } catch (error) {
      res.status(500).send({ error });
    }
  } else {
    res.status(500).send({ message: "not paid" });
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

module.exports = router;
