export function upload(gameObject) {  
  const testAdd = async () => {
    const game = new Game ({
      home: {
        name: gameObject.home.name,
        book: gameObject.home.book,
        line: gameObject.home.line,
        id: gameObject.home.id
      },
      away: {
        name: gameObject.away.name,
        book: gameObject.away.book,
        line: gameObject.away.line,
        id: gameObject.away.id
      },
      arb: gameObject.arb,
      spread: gameObject.spread
    })
    await game.save();
  }
  
  testAdd().then(() => {
    mongoose.connection.close();
  })
}