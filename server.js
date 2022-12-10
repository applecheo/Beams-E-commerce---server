require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const signupController = require("./controllers/SignupController");
const loginController = require("./controllers/LoginController");
const productDetailController = require("./controllers/ProductDetailController");
const productDetailWomenController = require("./controllers/ProductDetailWomenController");
const checkoutController = require("./controllers/CheckoutController");
const ordersController = require("./controllers/OrdersController");
const profileController = require("./controllers/ProfileController");
const wishListController = require("./controllers/WishListController");
const homeController = require("./controllers/HomeController");
const stripe = require("./stripe");
const jwt = require("jsonwebtoken");
const User = require("./models/UserSchema");
const Product = require("./models/ProductSchema");
const TOKEN = process.env.TOKEN;

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT ?? 3000;
mongoose.connect(MONGO_URL);
mongoose.connection.once("open", () => {
  console.log(`connected to mongo at ${MONGO_URL}`);
});

//middleware
const app = express();
app.use(cors());
app.use(express.json());

app.use("/signup", signupController);
app.use("/login", loginController);
app.use("/men", productDetailController);
app.use("/women", productDetailWomenController);
app.use("/home", homeController);
app.use("/account/wishlist", wishListController);
app.use("/checkout", checkoutController);
app.use("/account/orders", ordersController);
app.use("/account/profile", profileController);
app.use("/", stripe);

//seed product data
// app.post("/seed", (req, res) => {
//   const a = req.body;
//   Product.create(a, (error, user) => {
//     res.status(201).send({ msg: "Data seeded" });
//   });
// });

// all product page
app.get("/", async (req, res) => {
  try {
    const allProduct = await Product.find({ isSoldOut: false });
    res.status(201).send(allProduct);
  } catch (error) {
    res.status(500).send({ error });
  }
});
//relogin
app.get("/relogin", async (req, res) => {
  const bearer = req.get("Authorization");
  const token = bearer.split(" ")[1];
  try {
    const payload = jwt.verify(token, TOKEN);
    const user = await User.findById(payload.userId);
    if (user) {
      res.status(201).send({ user: user });
    }
  } catch (error) {
    res.status(401).send({ msg: "Please Login" });
  }
});

app.listen(PORT, () => {
  console.log(PORT);
});
