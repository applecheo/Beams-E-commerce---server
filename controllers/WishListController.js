const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (user.wishList.includes(productId) === false) {
      const addToWishList = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { wishList: productId } },
        {
          new: true,
        }
      ).populate("wishList");
      return res.status(201).send(addToWishList);
    } else {
      const removeFromWishList = await User.findByIdAndUpdate(
        userId,
        {
          $pull: { wishList: { $in: productId } },
        },
        {
          new: true,
        }
      );
      return res.status(201).send(removeFromWishList);
    }
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = router;
