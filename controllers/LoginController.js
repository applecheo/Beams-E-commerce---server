const express = require("express");
const User = require("../models/UserSchema");
const router = express.Router();
const jwt = require("jsonwebtoken");
const TOKEN = process.env.TOKEN;
const bcrypt = require("bcrypt");

const HasToken = async (req, res, next) => {
  const bearer = req.get("Authorization");
  const token = bearer.split(" ")[1];

  try {
    const payload = jwt.verify(token, TOKEN);
    const user = await User.findById(payload.userId);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: "Please Login" });
    }
  } catch (error) {
    res.status(401).send({ error });
  }
};

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user === null) {
    res.status(401).send({ error: "Please use a valid email and password" });
  } else if (bcrypt.compareSync(password, user.password)) {
    const userId = user._id;
    const email = user.email;
    const payload = { userId, email };

    const token = jwt.sign(payload, TOKEN, { expiresIn: "1h" });
    res.status(200).send({ msg: "Login Success", token });
  } else {
    res.status(401).send({ error: "Please use a valid email and password" });
  }
});

router.post("/test", HasToken, async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  res.send(user);
});
module.exports = router;
