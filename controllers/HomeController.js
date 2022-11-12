const express = require("express");
const Product = require("../models/ProductSchema");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allProduct = await Product.find({
      $and: [{ isSoldOut: false }, { isNewArrival: true }],
    });
    res.status(201).send(allProduct);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.put("/", async (req, res) => {
  try {
    const allProduct = await Product.find({
      $and: [{ isSoldOut: false }, { isNewArrival: true }],
    });
    if (allProduct.length - updateNewArrivals(allProduct).length < 12) {
      return res.status(201).send(allProduct);
    } else {
      await Product.updateMany(
        {
          _id: { $in: updateNewArrivals(allProduct) },
        },
        { isNewArrival: false },
        {
          new: true,
        }
      );
      const updatedNewArrivalProduct = await Product.find({
        $and: [{ isSoldOut: false }, { isNewArrival: true }],
      });
      return res.status(201).send(updatedNewArrivalProduct);
    }
  } catch (error) {
    res.status(400).send({ error });
  }
});

const updateNewArrivals = (allProduct) => {
  const updatedProductData = allProduct
    .filter((x) => {
      const dateAfter7Days = new Date(x.createdAt);
      dateAfter7Days.setDate(dateAfter7Days.getDate() + 7);
      const todayDate = new Date();
      return todayDate > dateAfter7Days;
    })
    .map((x) => x._id);
  return updatedProductData;
};

module.exports = router;
