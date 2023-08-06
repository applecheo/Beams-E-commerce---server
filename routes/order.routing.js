const express = require("express");
const orderService = require("../service/order");
const HasToken = require("../middleware");
const routing = express.Router();

routing.get("/:id", HasToken, async (req, res, next) => {
  const userId = req.params.id;
  try {
    const orders = await orderService.getOrderByUserId(userId);
    res.status(201).send(orders);
  } catch (error) {
    next(error);
  }
});

routing.get("/detail/:id", HasToken, async (req, res, next) => {
  const orderId = req.params.id;
  try {
    const orders = await orderService.getOrderDetails(orderId);
    res.status(201).send(orders);
  } catch (error) {
    next(error);
  }
});
module.exports = routing;
