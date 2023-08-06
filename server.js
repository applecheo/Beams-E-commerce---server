require("dotenv").config();
const express = require("express");
const cors = require("cors");

// const signupController = require("./controllers/SignupController");
// const loginController = require("./controllers/LoginController");
// const productDetailController = require("./controllers/ProductDetailController");
// const productDetailWomenController = require("./controllers/ProductDetailWomenController");
// const checkoutController = require("./controllers/CheckoutController");
// const ordersController = require("./controllers/OrdersController");
// const profileController = require("./controllers/ProfileController");
// const wishListController = require("./controllers/WishListController");
// const homeController = require("./controllers/HomeController");
// const stripe = require("./stripe");
// const jwt = require("jsonwebtoken");
// const User = require("./models/UserSchema");
// const Product = require("./models/ProductSchema");
const errorLogger = require("./errorLogger");
// const TOKEN = process.env.TOKEN;
const productRouter = require("./routes/product.routing");
const userRouter = require("./routes/user.routing");
const orderRouter = require("./routes/order.routing");
const PORT = process.env.PORT ?? 3000;

//middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", productRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use(errorLogger);

// app.use("/signup", signupController);
// app.use("/login", loginController);
// app.use("/men", productDetailController);
// app.use("/women", productDetailWomenController);
// app.use("/home", homeController);
// app.use("/account/wishlist", wishListController);
// app.use("/checkout", checkoutController);
// app.use("/account/orders", ordersController);
// app.use("/account/profile", profileController);
// app.use("/", stripe);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
