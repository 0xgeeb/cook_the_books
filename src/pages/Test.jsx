import React, { useState } from "react"
// import data from "../utils/spreads.json"
import obj from "../utils/decimal_ml_data.json"
import logos from "../utils/logos.json"
import logo from ".././images/colored_logo.png"
import smoke2 from ".././images/flip_smoke.png"
import Card from "../components/Card.jsx";
import axios from "axios";

export default function Odds() {

  const [odds, setOdds] = useState([])
  const [sport, setSport] = useState('')
  const [bet, setBet] = useState('')
  const [arb, setArb] = useState(false)
  const [loading, setLoading] = useState(false)

  function profitPercentage(homeLine, awayLine) {
    return (100 * (1000 - ((1000 / homeLine) + (1000 / awayLine))) / ((1000 / homeLine) + (1000 / awayLine))).toFixed(2)
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
  
  async function uploadToDB(gameObject) {
    await axios.post('/minecraftspeedrun/db', gameObject);
    console.log('just uploaded to database on god');
  }

  async function fetchOdds() {
    setLoading(current => !current)
    // const response = await axios.get(`/minecraftspeedrun/bets/?sport=${sport}&bet=${bet}`);
    // const obj = {...response.data}
    const allGames = []
    for (let game in obj) {
      let gameObject = {}
      let homeObject = {}
      let awayObject = {}
      let homeOddsArray = []
      let awayOddsArray = []
      for (let book in obj[game]["bookmakers"]) {
        if (obj[game]["bookmakers"][book]["key"] == "betfair") {
          continue
        }
        const bookCut = obj[game]["bookmakers"][book]
        const outcomesCut = bookCut["markets"][0]["outcomes"]
        if (bet == "spreads") {
          homeObject = {
            "name": outcomesCut[0]["name"],
            "book": bookCut["title"],
            "line": outcomesCut[0]["price"],
            "id": obj[game]["id"],
            "spread": outcomesCut[0]["point"]
          }
          awayObject = {
            "name": outcomesCut[1]["name"],
            "book": bookCut["title"],
            "line": outcomesCut[1]["price"],
            "id": obj[game]["id"],
            "spread": outcomesCut[1]["point"]
          }
        }
        else {
          homeObject = {
            "name": outcomesCut[0]["name"],
            "book": bookCut["title"],
            "line": outcomesCut[0]["price"],
            "id": obj[game]["id"]
          }
          awayObject = {
            "name": outcomesCut[1]["name"],
            "book": bookCut["title"],
            "line": outcomesCut[1]["price"],
            "id": obj[game]["id"]
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
      // for testing purposes
      // console.log(arb)
      allGames.push(gameObject)
      if (profitPercentage(gameObject.home.line, gameObject.away.line) > 20) {
        uploadToDB(gameObject);
      }
    }
    // for testing purposes
    // console.log(allGames)
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

  return (
    <div className="" style={{backgroundImage: `url(${smoke2})`}} id="background-div">
      <div className="w-1/4 bg-neutral-200 border-neutral-600 rounded border-2 flex flex-col justify-center mt-24 mb-96 mx-auto" id="home-button">
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
              className="bg-slate-200 text-black hover:bg-black rounded-3xl hover:text-slate-200 p-4 border-4 border-cyan-400"
            >
              find arbs
            </button>
          </div>
        </form>
      </div>
        {loading && <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
        {odds.length < 1 && <div className="mb-24"></div>}
        <div className="bg-white mt-12 ml-12 mr-12 mb-24">
          {arb && <h1 className="flex justify-center text-3xl mb-5">games with an arb</h1>}
          <div className="grid grid-cols-3 gap-4">
            {odds.map((x) => {
              return Card(x);
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