require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT ?? 3000;
mongoose.connect(MONGO_URL);
mongoose.connection.once("open", () => {
  console.log(`connected to mongo at ${MONGO_URL}`);
});

//middleware
const app = express();
app.use(cors());

app.listen(PORT, () => {
  console.log(PORT);
});
