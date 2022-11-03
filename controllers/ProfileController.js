const express = require("express");
const HasToken = require("../Middleware");
const User = require("../models/UserSchema");
const router = express.Router();

router.delete("/:id", HasToken, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
