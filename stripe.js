const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const express = require("express");
const Product = require("./models/ProductSchema");
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
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
      success_url: `${process.env.CLIENT_URL}/checkout?id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/checkout-session", async (req, res) => {
  const { id } = req.query;
  const session = await stripe.checkout.sessions.retrieve(id, {
    expand: ["line_items"],
  });

  res.json(session);
});
module.exports = router;
