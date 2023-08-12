const dbModel = require("../utilities/connection");

let userModel = {};

userModel.getUser = async (email) => {
  await dbModel.getOrder();
  const model = await dbModel.getUser();
  const data = await model.findOne({ email }).populate("orders", "watchList");
  if (data) {
    return data;
  } else {
    return null;
  }
};

userModel.createUser = async (userObjPasswordHashed) => {
  const model = await dbModel.getUser();
  const data = await model.create(userObjPasswordHashed);
  if (data) {
    return data;
  } else {
    return null;
  }
};

userModel.getUserById = async (userId) => {
  const model = await dbModel.getUser();
  const data = await model.findById(userId);
  if (data) {
    return data;
  } else {
    return null;
  }
};

userModel.deleteUser = async (userId) => {
  const model = await dbModel.getUser();
  const data = await model.findByIdAndDelete(userId);
  if (data) {
    return data;
  } else {
    return null;
  }
};

userModel.getUserWishlist = async (userId) => {
  await dbModel.getProduct();
  const model = await dbModel.getUser();
  const data = await model
    .findById(userId, { wishList: 1 })
    .populate("wishList");
  if (data) {
    return data;
  } else {
    return null;
  }
};

userModel.addToUserWishlist = async (userId, productId) => {
  await dbModel.getProduct();
  const model = await dbModel.getUser();
  const data = await model
    .findByIdAndUpdate(
      userId,
      { $addToSet: { wishList: productId } },
      {
        new: true,
      }
    )
    .populate("wishList");
  if (data) {
    return data;
  } else {
    return null;
  }
};

userModel.removeFromUserWishlist = async (userId, productId) => {
  await dbModel.getProduct();
  const model = await dbModel.getUser();
  const data = await model.findByIdAndUpdate(
    userId,
    {
      $pull: { wishList: { $in: productId } },
    },
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

userModel.updateUserOrder = async (orderId, userId) => {
  await dbModel.getProduct();
  const model = await dbModel.getUser();
  const data = await model.findByIdAndUpdate(
    userId,
    { $addToSet: { orders: orderId } },
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
module.exports = userModel;
