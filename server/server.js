const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const axios = require('axios');
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
const dbUrl = process.env.ATLAS_URI;

const server = http.createServer(app);

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database connected");
});

app.get('/minecraftspeedrun', async (req, res) => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
  res.send(response.data);
})

app.get('/minecraftspeedrun/bets', async (req, res) => {
  const response = await axios.get('https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=669e626a8993cf0aa8fbd0edc9707263&regions=us&markets=h2h&oddsFormat=decimal')
  console.log(response.data);
})









console.log("NODE_ENV is", process.env.NODE_ENV);
 
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
}

server.listen(port, () => console.log(`Listening on port ${port}`));