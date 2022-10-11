const express = require("express");
const Product = require("../models/ProductSchema");
const router = express.Router();

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
