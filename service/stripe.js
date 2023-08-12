const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const orderService = require("./order");
const productService = require("./product");
let stripeService = {};

stripeService.createCheckoutSession = async (newOrder) => {
  const { products } = newOrder;
  const storeItems = await productService.getAllProducts();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: products.map((item) => {
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

  const newOrderAdded = await orderService.createOrder(newOrder);
  if (newOrderAdded) {
    return session.url;
  } else {
    let err = new Error(`Could not generate order`);
    err.status = 404;
    throw err;
  }
};

module.exports = stripeService;
