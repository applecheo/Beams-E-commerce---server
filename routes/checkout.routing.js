const express = require("express");
const HasToken = require("../middleware");
const stripeService = require("../service/stripe");
const orderService = require("../service/order");
const routing = express.Router();

routing.post("/create-checkout-session", HasToken, async (req, res, next) => {
  const newOrder = req.body;
  try {
    const sessionUrl = await stripeService.createCheckoutSession(newOrder);
    res.status(201).json({ url: sessionUrl });
  } catch (error) {
    next(error);
  }
});

routing.put("/", HasToken, async (req, res, next) => {
  const sessionId = req.query.id;
  const userId = req.body._id;
  try {
    const message = await orderService.checkout(sessionId, userId);
    res.status(201).json({ message: message });
  } catch (error) {
    next(error);
  }
});

module.exports = routing;
