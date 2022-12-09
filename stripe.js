const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const express = require("express");
const Product = require("./models/ProductSchema");
const router = express.Router();

router.post("/", async (req, res) => {
  const storeItems = await Product.find({ isSoldOut: false });
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.find((x) => x._id == item);
        return {
          price_data: {
            currency: "sgd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.price * 100,
          },
          quantity: 1,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/checkout`,
      cancel_url: `${process.env.CLIENT_URL}`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
