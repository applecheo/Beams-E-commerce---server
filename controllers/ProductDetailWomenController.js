const express = require("express");
const Product = require("../models/ProductSchema");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allProduct = await Product.find({
      $and: [{ isSoldOut: false }, { gender: "Women" }],
    });
    res.status(201).send(allProduct);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
