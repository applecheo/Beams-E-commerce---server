require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const signupController = require("./controllers/SignupController");
const loginController = require("./controllers/LoginController");
const productDetailController = require("./controllers/ProductDetailController");
const checkoutController = require("./controllers/CheckoutController");
const ordersController = require("./controllers/OrdersController");
const profileController = require("./controllers/ProfileController");
const Product = require("./models/ProductSchema");

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
// app.use("/women", productDetailController);
app.use("/checkout", checkoutController);
app.use("/account/orders", ordersController);
app.use("/account/profile", profileController);

//seed product data
app.post("/seed", (req, res) => {
  const a = req.body;
  Product.create(a, (error, user) => {
    res.status(201).send({ msg: "Data seeded" });
  });
});

//home page product
app.get("/", async (req, res) => {
  try {
    const allProduct = await Product.find({ isSoldOut: false });
    res.status(201).send(allProduct);
  } catch (error) {
    res.status(500).send({ error });
  }
});
app.listen(PORT, () => {
  console.log(PORT);
});
