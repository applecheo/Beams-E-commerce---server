const dbModel = require("../utilities/connection");

let productModel = {};

productModel.getAllProducts = async () => {
  const model = await dbModel.getProduct();
  const data = await model.find({ isSoldOut: false });
  if (data.length > 0) {
    return data;
  } else {
    return null;
  }
};

productModel.getProductOfSpecificGender = async (gender) => {
  const model = await dbModel.getProduct();
  const data = await model.find({
    $and: [{ isSoldOut: false }, { gender: gender }],
  });
  if (data.length > 0) {
    return data;
  } else {
    return null;
  }
};

productModel.getProductById = async (productId) => {
  const model = await dbModel.getProduct();
  const data = await model.findById(productId);
  if (data) {
    return data;
  } else {
    return null;
  }
};

productModel.getProductsByName = async (productNames) => {
  const model = await dbModel.getProduct();
  const data = await model.find({
    $and: [{ name: { $in: productNames } }, { isSoldOut: false }],
  });
  if (data) {
    return data;
  } else {
    return null;
  }
};

productModel.getLatestArrivalProducts = async () => {
  const model = await dbModel.getProduct();
  const data = await model.find({
    $and: [{ isSoldOut: false }, { isNewArrival: true }],
  });
  if (data.length > 0) {
    return data;
  } else {
    return null;
  }
};

productModel.updateProductToLatestArrival = async (updatedProduct) => {
  const model = await dbModel.getProduct();
  await model.updateMany(
    {
      _id: { $in: updatedProduct },
    },
    { isNewArrival: false },
    {
      new: true,
    }
  );
};
//fix
productModel.updateProductsToSold = async (productIds) => {
  const model = await dbModel.getProduct();
  const updatedProduct = [];

  for (let i = 0; i < productIds.length; i++) {
    const product = await model.updateOne(
      {
        _id: productIds[i],
      },
      { $set: { isSoldOut: true } },
      {
        new: true,
      }
    );
    updatedProduct.push(product);
  }

  if (updatedProduct.length === productIds.length) {
    return updatedProduct;
  } else {
    return null;
  }
};
module.exports = productModel;
