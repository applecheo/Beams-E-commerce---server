const express = require("express");
const productService = require("../service/product");
const routing = express.Router();

routing.get("/", async (req, res, next) => {
  try {
    const allProduct = await productService.getAllProducts();
    res.status(201).send(allProduct);
  } catch (error) {
    next(error);
  }
});

routing.get("/product", async (req, res, next) => {
  const productId = req.query.id;
  try {
    const product = await productService.getProductById(productId);
    res.status(201).send(product);
  } catch (error) {
    next(error);
  }
});

routing.get("/:gender", async (req, res, next) => {
  const { gender } = req.params;
  try {
    const allProduct = await productService.getProductOfSpecificGender(gender);
    res.status(201).send(allProduct);
  } catch (error) {
    next(error);
  }
});

routing.get("/product/latest", async (req, res, next) => {
  try {
    const allProduct = await productService.getLatestArrivalProducts();
    res.status(201).send(allProduct);
  } catch (error) {
    next(error);
  }
});

routing.put("/product/latest", async (req, res, next) => {
  try {
    const allProduct = await productService.updateLatestArrivalProduct();
    res.status(201).send(allProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = routing;
