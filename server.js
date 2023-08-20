require("dotenv").config();
const express = require("express");
const cors = require("cors");

const errorLogger = require("./errorLogger");
const productRouter = require("./routes/product.routing");
const userRouter = require("./routes/user.routing");
const orderRouter = require("./routes/order.routing");
const checkoutRouter = require("./routes/checkout.routing");
const PORT = process.env.PORT ?? 3000;

//middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", productRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use("/checkout", checkoutRouter);
app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
