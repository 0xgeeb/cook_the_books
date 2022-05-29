const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const axios = require('axios');
const mongoose = require('mongoose');
const Game = require('./model');
const cors = require('cors');
require("dotenv").config();

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const dbUrl = process.env.ATLAS_URI;
const apiKey = process.env.ODDS_APIKEY;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database connected");
});

app.post('/minecraftspeedrun/db', async (req, res) => {
  const game = new Game ({
    home: {
      name: req.body.home.name,
      book: req.body.home.book,
      line: req.body.home.line,
      id: req.body.home.id
    },
    away: {
      name: req.body.away.name,
      book: req.body.away.book,
      line: req.body.away.line,
      id: req.body.away.id
    },
    arb: req.body.arb,
    spread: req.body.spread
  })
  await game.save();
});

app.get('/minecraftspeedrun/bets', async (req, res) => {
  // try {
  //   // const response = await axios.get(`https://api.the-odds-api.com/v4/sports/${req.query.sport}/odds/?apiKey=${apiKey}&regions=us&markets=${req.query.bet}&oddsFormat=decimal`);
  //   const response = await axios.get(`https://api.the-odds-api.com/v4/sports/${req.query.sport}/odds/?apiKey=${}&regions=us&markets=${req.query.bet}&oddsFormat=decimal`);
  //   res.send(response.data);
  // }
  // catch (e) {
  res.send('error')
  // }
});

app.get('/minecraftspeedrun/recent', async (req, res) => {
  const response = await Game.find().sort({ _id: -1 }).limit(4);
  res.send(response);
});

console.log("NODE_ENV is", process.env.NODE_ENV);
 
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
};

server.listen(port, () => console.log(`Listening on port ${port}`));