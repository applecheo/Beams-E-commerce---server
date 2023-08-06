const productModel = require("../models/product");

let productService = {};

productService.getAllProducts = async () => {
  const products = await productModel.getAllProducts();
  if (products) {
    return products;
  } else {
    let err = new Error(`Could not get products`);
    err.status = 404;
    throw err;
  }
};

productService.getProductOfSpecificGender = async (gender) => {
  gender = gender.substr(0, 1).toUpperCase().concat(gender.substr(1));
  const products = await productModel.getProductOfSpecificGender(gender);
  if (products) {
    return products;
  } else {
    let err = new Error(`Could not get products for ${gender}`);
    err.status = 404;
    throw err;
  }
};

productService.getProductById = async (productId) => {
  const product = await productModel.getProductById(productId);
  if (product) {
    return product;
  } else {
    let err = new Error(`Could not get products`);
    err.status = 404;
    throw err;
  }
};

productService.getLatestArrivalProducts = async () => {
  const product = await productModel.getLatestArrivalProducts();
  if (product) {
    return product;
  } else {
    let err = new Error(`Could not get products`);
    err.status = 404;
    throw err;
  }
};

productService.updateLatestArrivalProduct = async () => {
  const updateNewArrivals = (allProduct) => {
    const updatedProductData = allProduct
      .filter((x) => {
        const dateAfter7Days = new Date(x.createdAt);
        dateAfter7Days.setDate(dateAfter7Days.getDate() + 7);
        const todayDate = new Date();
        return todayDate > dateAfter7Days;
      })
      .map((x) => x._id);
    return updatedProductData;
  };

  const allProduct = await productService.getLatestArrivalProducts();
  const updatedProduct = updateNewArrivals(allProduct);

  if (allProduct.length - updatedProduct.length < 15) {
    return allProduct;
  } else {
    await productModel.updateProductToLatestArrival();
    const latestArrivalProducts = await productModel.getLatestArrivalProducts();
    if (latestArrivalProducts) {
      return latestArrivalProducts;
    } else {
      let err = new Error(`Could not get products`);
      err.status = 404;
      throw err;
    }
  }
};

module.exports = productService;
