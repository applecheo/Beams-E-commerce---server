/* eslint-disable unused-imports/no-unused-vars */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/UserSchema");

router.post("/", async (req, res) => {
  const newUser = req.body;
  try {
    const { email } = newUser;
    const user = await User.find({
      email: email,
    });
    const emailExist = user.find((x) => x.email === email);
    const check = () => {
      if (emailExist) {
        return res.status(500).send({ msg: "Email already in use" });
      } else {
        const newUserPasswordIsHash = {
          ...newUser,
          password: bcrypt.hashSync(newUser.password, 10),
        };
        User.create(newUserPasswordIsHash, (error, user) => {
          res.status(201).send({ msg: "Your Account have been created" });
        });
      }
    };
    check();
  } catch (error) {
    res.send({ msg: error });
  }
});

module.exports = router;
