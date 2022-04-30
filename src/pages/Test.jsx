import React, { useState } from "react"
// import data from "../utils/spreads.json"
import data from "../utils/decimal_ml_data.json"
import logos from "../utils/logos.json"
import logo from ".././images/logo.png"
import axios from "axios";

export default function Odds() {

  const apiKey = process.env.REACT_APP_APIKEY;
  const [odds, setOdds] = useState([])
  const [sport, setSport] = useState('')
  const [bet, setBet] = useState('')
  const [arb, setArb] = useState(false)
  const [loading, setLoading] = useState(false)

  function profitPercentage(homeLine, awayLine) {
    return (100 * (1000 - ((1000 / homeLine) + (1000 / awayLine))) / ((1000 / homeLine) + (1000 / awayLine))).toFixed(2)
  };

  // async function getJoke() {
  //   const response = await axios.get('/minecraftspeedrun');
  //   console.log(response);
  // };

  // getJoke();

  async function getBets() {
    const response = await axios.get('/minecraftspeedrun/bets');
  }

  getBets();
  

  async function fetchOdds() {
    setLoading(current => !current)
    const response = await fetch(`https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${apiKey}&regions=us&markets=${bet}&oddsFormat=decimal`);
    const data = await response.json()
    // console.log(data);
    const obj = {...data}
    const allGames = []
    for (let game in obj) {
      let gameObject = {}
      let homeObject = {}
      let awayObject = {}
      let homeOddsArray = []
      let awayOddsArray = []
      for (let book in data[game]["bookmakers"]) {
        if (data[game]["bookmakers"][book]["key"] == "betfair") {
          continue
        }
        const bookCut = data[game]["bookmakers"][book]
        const outcomesCut = bookCut["markets"][0]["outcomes"]
        if (bet == "spreads") {
          homeObject = {
            "name": outcomesCut[0]["name"],
            "book": bookCut["title"],
            "line": outcomesCut[0]["price"],
            "id": data[game]["id"],
            "spread": outcomesCut[0]["point"]
          }
          awayObject = {
            "name": outcomesCut[1]["name"],
            "book": bookCut["title"],
            "line": outcomesCut[1]["price"],
            "id": data[game]["id"],
            "spread": outcomesCut[1]["point"]
          }
        }
        else {
          homeObject = {
            "name": outcomesCut[0]["name"],
            "book": bookCut["title"],
            "line": outcomesCut[0]["price"],
            "id": data[game]["id"]
          }
          awayObject = {
            "name": outcomesCut[1]["name"],
            "book": bookCut["title"],
            "line": outcomesCut[1]["price"],
            "id": data[game]["id"]
          }
        }
        homeOddsArray.push(homeObject)
        awayOddsArray.push(awayObject)
      }
      const opp = homeOddsArray.reduce(function (prev, current) {
        return (prev.line > current.line) ? prev : current
      })
      const awayOpp = awayOddsArray.reduce(function (prev, current) {
        return (prev.line > current.line) ? prev : current
      })
      const arb = (1 / opp.line) + (1 / awayOpp.line)
      if (arb > 1) {
        gameObject = {
          "home": opp,
          "away": awayOpp,
          "arb": false,
          "spread": true
        }
      }
      else {
        gameObject = {
          "home": opp,
          "away": awayOpp,
          "arb": true,
          "spread": true
        }
        if (bet == "spreads") {  
          if (opp.spread+awayOpp.spread != 0) {
            gameObject = {
              "home": opp,
              "away": awayOpp,
              "arb": false,
              "spread": false
            }
          }
        }
      }
      allGames.push(gameObject)
      if (profitPercentage(gameObject.home.line, gameObject.away.line) > 1 && profitPercentage(gameObject.home.line, gameObject.away.line) < 2) {
        // upload(gameObject);
        // console.log('hopefully just sent to database');
      }
    }
    console.log(allGames)
    setOdds([])
    for (let i in allGames) {
      setOdds((prevOdds) => {
        const newState = [...prevOdds]
        newState.push(allGames[i])
        return newState
      })
    }
    setArb(false)
    for (let i in allGames) {
      if (allGames[i].arb) {
        setArb(current => !current)
        break
      }
    }
    setLoading(current => !current)
  }

  function getLogo(team) {
    for (let i in logos) {
      if (team == logos[i].team) {
        return logos[i].info.url
      }
    }
    return "https://cdn.anime-pictures.net/previews/f59/f591ed67a9d7530d11e6b54865760063_sp.jpg"
  }

  function arbNoSpread() {
    for(let i in odds) {
      if (!odds[i].spread) {
        return true
      }
    }
  }

  function noArbNoSpread() {
    for(let i in odds) {
      if (!odds[i].arb && odds[i].spread) {
        return true
      }
    }
  }

  function arbNoSpreadMap(object) {
    if(!object.arb && !object.spread) {
      return true
    }
  }

  function noArbNoSpreadMap(object) {
    if(!object.arb && object.spread) {
      return true
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetchOdds();
  }

  return (
    <div className="w-5/6 bg-white border-emerald-400 rounded border-4 flex flex-col justify-center mt-24 mb-96 mx-auto h-max">
      <h1 className="text-emerald-400 flex justify-center mt-24 text-[80px]">gypsy balls</h1>
      <div className="flex justify-center mb-24">
        <img className="h-20 w-20" src={logo} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-2 gap-4">
            <label className="place-self-center" htmlFor="sport">select a sport</label>
            <label className="place-self-center" htmlFor="bet">ML or spreads?</label>
            <select name="sport" id="sport" onChange={(e) => setSport(e.target.value)}>
              <option></option>
              <option value="basketball_nba">NBA</option>
              <option value="icehockey_nhl">NHL</option>
              <option value="baseball_mlb">MLB</option>
            </select>
            <div className="grid grid-cols-2 gap-4">
              <input className="place-self-center" type="radio" id="h2h" name="betradio" onChange={(e) => setBet(e.target.id)} />
              <input className="place-self-center" type="radio" id="spreads" name="betradio" onChange={(e) => setBet(e.target.id)} />
              <label className="place-self-center" htmlFor="h2h">moneyline</label>
              <label className="place-self-center" htmlFor="spreads">spreads</label>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-slate-200 text-black hover:bg-black rounded-3xl hover:text-slate-200 p-4 border-4 border-emerald-400"
          >
            find arbs
          </button>
        </div>
      </form>
      {loading && <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
      {odds.length < 1 && <div className="mb-24"></div>}
      <div className="mt-12 ml-12 mr-12 mb-24">
        {arb && <h1 className="flex justify-center text-3xl mb-5">games with an arb</h1>}
        <div className="grid grid-cols-2 gap-4">
          {odds.map((x) => {
            return x.arb &&
              <div className="flex flex-col items-center border-2 border-emerald-400 rounded pb-4" key={x.home.id}>
                <p className="mb-5 mt-2">{x.home.name} - {x.away.name}</p>
                <div className="grid grid-cols-2">
                  <img className="place-self-end" src={getLogo(x.home.name)} />
                  <p className="self-center place-self-center">{`bet $${(1000 / x.home.line).toFixed(2)} on ${x.home.book} for ${x.home.line}`}</p>
                  <img className="place-self-end" src={getLogo(x.away.name)} />
                  <p className="self-center place-self-center">{`bet $${(1000 / x.away.line).toFixed(2)} on ${x.away.book} for ${x.away.line}`}</p>
                </div>
                <p className="flex justify-center mt-4">{`$${(1000 - ((1000 / x.home.line) + (1000 / x.away.line))).toFixed(2)} profit on a total bet of $${((1000 / x.home.line) + (1000 / x.away.line)).toFixed(2)} for a risk-free ${profitPercentage(x.home.line, x.away.line)}`}%</p>
              </div>
          })}
        </div>
      </div>
      <div className="m-12">
        { arbNoSpread() && <h1 className="flex justify-center text-3xl mb-5">games with arb but potential loss due to spread diff.</h1>}
        <div className="grid grid-cols-3 gap-4">
          {odds.map((x) => {
            return arbNoSpreadMap(x) &&
              <div className="flex flex-col items-center border-2 border-yellow-400 rounded pb-2" key={x.away.id}>
                <p className="mb-5 mt-2">{x.home.name} - {x.away.name}</p>
                <div className="grid grid-cols-2">
                  <img src={getLogo(x.home.name)} />
                  <img src={getLogo(x.away.name)} />
                  <span className="flex justify-center">{x.home.line}</span>
                  <span className="flex justify-center">{x.away.line}</span>
                  <p className="flex justify-center">{x.home.book}</p>
                  <p className="flex justify-center">{x.away.book}</p>
                </div>
              </div>
          })}
        </div>
      </div>
      <div className="m-12">
        {noArbNoSpread() && <h1 className="flex justify-center text-3xl mb-5">games with no arb</h1>}
        <div className="grid grid-cols-3 gap-4">
          {odds.map((x) => {
            return noArbNoSpreadMap(x) &&
              <div className="flex flex-col items-center border-2 border-red-400 rounded pb-2" key={x.away.id}>
                <p className="mb-5 mt-2">{x.home.name} - {x.away.name}</p>
                <div className="grid grid-cols-2">
                  <img src={getLogo(x.home.name)} />
                  <img src={getLogo(x.away.name)} />
                  <span className="flex justify-center">{x.home.line}</span>
                  <span className="flex justify-center">{x.away.line}</span>
                  <p className="flex justify-center">{x.home.book}</p>
                  <p className="flex justify-center">{x.away.book}</p>
                </div>
              </div>
          })}
        </div>
      </div>
    </div>
  )
}