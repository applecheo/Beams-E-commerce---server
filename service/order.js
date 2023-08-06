const orderModel = require("../models/order");

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
module.exports = orderService;
