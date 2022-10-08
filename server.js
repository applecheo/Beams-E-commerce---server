require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const signupController = require("./controllers/SignupController");
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

app.post("/seed", (req, res) => {
  const a = req.body;
  console.log(a);
  Product.create(a, (error, user) => {
    res.status(201).send({ msg: "Your Account have been created" });
  });
});

// app.get("/seed", async (req, res) => {
//   const products = [
//     {
//       category: "Coats",
//       gender: "Men",
//       images: [
//         "https://images.asos-media.com/products/asos-design-longline-faux-fur-coat-in-checkerboard/202443213-1-white",

//         "https://images.asos-media.com/products/asos-design-longline-faux-fur-coat-in-checkerboard/202443213-2",

//         "https://images.asos-media.com/products/asos-design-longline-faux-fur-coat-in-checkerboard/202443213-3",

//         "https://images.asos-media.com/products/asos-design-longline-faux-fur-coat-in-checkerboard/202443213-4",
//       ],

//       name: "ASOS DESIGN longline faux fur coat in checkerboard",
//       price: 178,
//       size: "S",
//     },
//     {
//       category: "Coats",
//       gender: "Men",
//       images: [
//         "https://images.asos-media.com/products/asos-design-longline-faux-fur-coat-in-checkerboard/202443213-1-white",

//         "https://images.asos-media.com/products/asos-design-longline-faux-fur-coat-in-checkerboard/202443213-2",

//         "https://images.asos-media.com/products/asos-design-longline-faux-fur-coat-in-checkerboard/202443213-3",

//         "https://images.asos-media.com/products/asos-design-longline-faux-fur-coat-in-checkerboard/202443213-4",
//       ],

//       name: "ASOS DESIGN longline faux fur coat in checkerboard",
//       price: 178,
//       size: "L",
//     },
//     {
//       category: "Coats",
//       gender: "Men",
//       images: [
//         "https://images.asos-media.com/products/asos-design-longline-faux-fur-coat-in-checkerboard/202443213-1-white",

//         "https://images.asos-media.com/products/asos-design-longline-faux-fur-coat-in-checkerboard/202443213-2",

//         "https://images.asos-media.com/products/asos-design-longline-faux-fur-coat-in-checkerboard/202443213-3",

//         "https://images.asos-media.com/products/asos-design-longline-faux-fur-coat-in-checkerboard/202443213-4",
//       ],

//       name: "ASOS DESIGN longline faux fur coat in checkerboard",
//       price: 178,
//       size: "M",
//     },
//   ];

//   Product.create(products, (error, products) => {
//     if (error) {
//       res.status(500).send({ error });
//     } else {
//       res.status(201).send(products); //* has id
//     }
//   });
// });
app.listen(PORT, () => {
  console.log(PORT);
});
