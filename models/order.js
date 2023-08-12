const dbModel = require("../utilities/connection");

let orderModel = {};

orderModel.getOrderByUserId = async (userId) => {
  await dbModel.getOrder();
  await dbModel.getProduct();
  const model = await dbModel.getUser();
  const data = await model.findById(userId).populate({
    path: "orders",
    populate: {
      path: "products",
    },
  });
  if (data) {
    return data;
  } else {
    return null;
  }
};

orderModel.getOrderDetails = async (orderId) => {
  await dbModel.getProduct();
  const model = await dbModel.getOrder();
  const data = await model.findById(orderId).populate("products");
  if (data) {
    return data;
  } else {
    return null;
  }
};

orderModel.createOrder = async (newOrder) => {
  const model = await dbModel.getOrder();
  const data = await model.create(newOrder);
  if (data) {
    return data;
  } else {
    return null;
  }
};

orderModel.updateOrder = async (productIds, userId) => {
  const model = await dbModel.getOrder();
  const data = await model.findOneAndUpdate(
    { $and: [{ products: { $in: productIds } }, { orderedBy: userId }] },
    { paid: true },
    {
      new: true,
    }
  );
  if (data) {
    return data;
  } else {
    return null;
  }
};
module.exports = orderModel;
