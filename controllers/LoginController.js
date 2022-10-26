const express = require("express");
const User = require("../models/UserSchema");
const router = express.Router();
const jwt = require("jsonwebtoken");
const TOKEN = process.env.TOKEN;
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate("orders", "watchList");
  if (user === null) {
    res.status(401).send({ error: "Please use a valid email and password" });
  } else if (bcrypt.compareSync(password, user.password)) {
    const userId = user._id;
    const email = user.email;
    const payload = { userId, email };

    const token = jwt.sign(payload, TOKEN, { expiresIn: "1h" });
    res.status(200).send({ msg: "Login Success", token, user });
  } else {
    res.status(401).send({ error: "Please use a valid email and password" });
  }
});

module.exports = router;
