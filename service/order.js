const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const orderModel = require("../models/order");

const productService = require("./product");
const userService = require("./user");

let orderService = {};

orderService.getOrderByUserId = async (userId) => {
  const order = await orderModel.getOrderByUserId(userId);
  if (order) {
    return order;
  } else {
    let err = new Error(`No order available`);
    err.status = 401;
    throw err;
  }
};

orderService.getOrderDetails = async (orderId) => {
  const order = await orderModel.getOrderDetails(orderId);
  if (order) {
    return order;
  } else {
    let err = new Error(`No order available`);
    err.status = 401;
    throw err;
  }
};

orderService.createOrder = async (newOrder) => {
  const order = await orderModel.createOrder(newOrder);
  if (order) {
    return order;
  } else {
    let err = new Error(`Unable to create order`);
    err.status = 401;
    throw err;
  }
};

orderService.updateOrder = async (productIds, userId) => {
  const order = await orderModel.updateOrder(productIds, userId);
  if (order) {
    return order;
  } else {
    let err = new Error(`Unable to update order`);
    err.status = 401;
    throw err;
  }
};

orderService.checkout = async (sessionId, userId) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  if (session.payment_status === "paid") {
    const product_names = session.line_items.data.map((x) => x.description);
    const products = await productService.getProductsByName(product_names);
    const productIds = products.map((product) => product._id);
    const order = await orderService.updateOrder(productIds, userId);
    const product = await productService.updateProductsToSold(productIds);
    const user = await userService.updateUserOrder(order._id, userId);

    if (order && product && user) {
      return "success";
    } else {
      let err = new Error(`Unable to create order`);
      err.status = 401;
      throw err;
    }
  } else {
    let err = new Error(`Payment not done`);
    err.status = 401;
    throw err;
  }
};
module.exports = orderService;
