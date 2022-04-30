// require("dotenv").config();
// const mongoose = require('mongoose');
// const dbUrl = process.env.REACT_APP_ATLAS_URI;
// // const Game = require('./db/model');

// export function upload(gameObject) {
//   mongoose.connect(dbUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   });
  
//   const db = mongoose.connection;
//   db.on("error", console.error.bind(console, "connection error:"));
//   db.once("open", () => {
//     console.log("database connected");
//   });
  
//   const testAdd = async () => {
//     const game = new Game ({
//       home: {
//         name: gameObject.home.name,
//         book: gameObject.home.book,
//         line: gameObject.home.line,
//         id: gameObject.home.id
//       },
//       away: {
//         name: gameObject.away.name,
//         book: gameObject.away.book,
//         line: gameObject.away.line,
//         id: gameObject.away.id
//       },
//       arb: gameObject.arb,
//       spread: gameObject.spread
//     })
//     await game.save();
//   }
  
//   testAdd().then(() => {
//     mongoose.connection.close();
//   })
// }

// export function returnStuff() {
//   return "stuff";
// }