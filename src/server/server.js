const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = 5000;
app.use(cors());
app.use(express.json());
require("dotenv").config({ path: "./../../../config.env" });
const mongoose = require('mongoose');
const dbUrl = process.env.ATLAS_URI;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database connected");
});
 
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});