module.exports = {
    content: [
      "./src/*.{js,jsx,ts,tsx}", "./src/components/*.{js,jsx,ts,tsx}", "./src/pages/*.{js,jsx,ts,tsx}"
    ],
    theme: {
      extend: {
        fontFamily: {
          'rock': ['"Rock 3D"']
        },
        backgroundImage: {
          'bets': "url('./images/background.jpg')"
        }
      }
    },
    plugins: [],
  }