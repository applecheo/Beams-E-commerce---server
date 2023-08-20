const express = require("express");
const userService = require("../service/user");
const HasToken = require("../middleware");
const routing = express.Router();

routing.post("/signup", async (req, res, next) => {
  const userObj = req.body;
  try {
    const user = await userService.createUser(userObj);
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

routing.post("/login", async (req, res, next) => {
  const userObj = req.body;
  try {
    const user = await userService.loginUser(userObj);
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

routing.get("/relogin", async (req, res, next) => {
  const bearer = req.get("Authorization");
  try {
    const user = await userService.reLoginUser(bearer);
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

routing.delete("/:id", HasToken, async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await userService.deleteUser(userId);
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

routing.get("/wishlist/:id", HasToken, async (req, res, next) => {
  const userId = req.params.id;
  try {
    const wishList = await userService.getUserWishlist(userId);
    res.status(201).send(wishList);
  } catch (error) {
    next(error);
  }
});

routing.put("/wishlist/:id", HasToken, async (req, res, next) => {
  const productId = req.params.id;
  const { userId } = req.body;

  try {
    const wishList = await userService.updateUserWishlist(userId, productId);
    res.status(201).send(wishList);
  } catch (error) {
    next(error);
  }
});
module.exports = routing;
