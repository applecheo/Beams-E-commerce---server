const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TOKEN = process.env.TOKEN;

let userService = {};

userService.getUser = async (userObj) => {
  const { email } = userObj;
  const user = await userModel.getUser(email);
  if (user) {
    return user;
  } else {
    return false;
  }
};

userService.createUser = async (userObj) => {
  const { email } = userObj;
  const user = await userModel.getUser(email);
  if (!user) {
    const userObjPasswordHashed = {
      ...userObj,
      password: bcrypt.hashSync(userObj.password, 10),
    };

    const newUser = await userModel.createUser(userObjPasswordHashed);
    if (newUser) {
      return "Your Account have been created";
    } else {
      let err = new Error(`Error in creating your account`);
      err.status = 404;
      throw err;
    }
  } else {
    let err = new Error(`Email already in use`);
    err.status = 404;
    throw err;
  }
};

userService.loginUser = async (userObj) => {
  const { password } = userObj;
  const user = await userService.getUser(userObj);
  if (bcrypt.compareSync(password, user.password)) {
    const userId = user._id;
    const email = user.email;
    const payload = { userId, email };

    const token = jwt.sign(payload, TOKEN, { expiresIn: "1h" });
    return { msg: "Login Success", token, user };
  } else {
    let err = new Error(`Please use a valid email and password`);
    err.status = 404;
    throw err;
  }
};

userService.reLoginUser = async (bearer) => {
  const token = bearer.split(" ")[1];
  const payload = jwt.verify(token, TOKEN);
  const user = await userModel.getUserById(payload.userId);
  if (user) {
    return user;
  } else {
    let err = new Error(`Please Login`);
    err.status = 401;
    throw err;
  }
};

userService.deleteUser = async (userId) => {
  const user = await userModel.deleteUser(userId);
  if (user) {
    return "User deleted Successfully";
  } else {
    let err = new Error(`Fail to delete user`);
    err.status = 500;
    throw err;
  }
};

userService.getUserWishlist = async (userId) => {
  const wishlist = await userModel.getUserWishlist(userId);
  if (wishlist) {
    return wishlist;
  } else {
    let err = new Error(`Fail to get wishlist`);
    err.status = 500;
    throw err;
  }
};

userService.updateUserWishlist = async (userId, productId) => {
  const { wishList } = await userService.getUserWishlist(userId, productId);
  if (!wishList.find((product) => product._id == productId)) {
    const updatedWishlist = await userModel.addToUserWishlist(
      userId,
      productId
    );
    if (updatedWishlist) {
      return updatedWishlist;
    } else {
      let err = new Error(`Fail add product to wishlist`);
      err.status = 500;
      throw err;
    }
  } else {
    const updatedWishlist = await userModel.removeFromUserWishlist(
      userId,
      productId
    );
    if (updatedWishlist) {
      return updatedWishlist;
    } else {
      let err = new Error(`Fail remove product to wishlist`);
      err.status = 500;
      throw err;
    }
  }
};

module.exports = userService;
