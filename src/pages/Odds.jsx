import React, { useState } from "react";
// import data from "../utils/spreads.json";
// import obj from "../utils/decimal_ml_data.json";
import logo from ".././images/colored_logo.png";
import smoke2 from ".././images/flip_smoke.png";
import Card from "../components/Card.jsx";
import NoArbCard from "../components/NoArbCard.jsx";
import ArbNoSpreadCard from "../components/ArbNoSpreadCard";
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
  }

  async function fetchOdds() {
    setLoading(current => !current)
    const response = await axios.get(`/minecraftspeedrun/bets/?sport=${sport}&bet=${bet}`);
    const obj = {...response.data}
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
      // if (profitPercentage(gameObject.home.line, gameObject.away.line) > 20) {
      //   uploadToDB(gameObject);
      // }
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
    <div className="min-h-screen mb-10" style={{backgroundImage: `url(${smoke2})`}} id="background-div">
      <div className="p-7 w-1/3 bg-[#F7F7F7] flex flex-col justify-center mt-48 mb-48 mx-auto rounded" id="card-div-shadow">
        <h1 className="mx-auto text-2xl font-bold text-cyan-400 mb-8">Select a Sport and Type of Bet</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-around ml-0">
            <span>sport (NBA, MLB, or NHL)</span>
            <span>bet (moneyline or spreads)</span>
          </div>
          <div className="flex flex-row justify-around">
            <select className="rounded py-3 w-64" name="sport" id="sport" onChange={(e) => setSport(e.target.value)}>
              <option hidden></option>
              <option value="basketball_nba">NBA</option>
              <option value="baseball_mlb">MLB</option>
              <option value="icehockey_nhl">NHL</option>
            </select>
            <select className="rounded py-3 w-64" name="bet" id="bet" onChange={(e) => setBet(e.target.value)}>
              <option hidden></option>
              <option value="h2h">moneyline</option>
              <option value="spreads">spreads</option>
            </select>
          </div>
          <a className="flex justify-center" ><button className="ml-1 mr-4 py-1 px-3 mt-8 whitespace-nowrap bg-white hover:text-white hover:bg-black rounded-lg" id="home-button">
            <div className="flex flex-row">
              <span className="mt-1">find arbs</span>
              <img className="ml-2" src={logo} height="30" width="30" />
            </div>
            </button>
          </a>
        </form>
      </div>
      <div className="flex justify-center">
        {loading && <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
      </div>
      {arb && <div className="m-0 mb-24">
          <h1 className="w-5/6 mx-auto flex justify-start text-3xl font-bold mb-5" id="arb-title">Games with Arbitrage Opportunities</h1>
          <div className="w-5/6 h-[450px] mx-auto flex overflow-x-auto overflow-y-hidden" id="hide-scrollbar">
            {odds.map((x) => {
              return x.arb &&
                Card(x);
            })}
          </div>
        </div>
      }
      {arbNoSpread() && <div className="m-0 mb-24">
          <h1 className="w-5/6 mx-auto flex justify-start text-3xl font-bold" id="arb-title">Games with an Arbitrage Opportunity but Spread Difference</h1>
          <div className="w-5/6 mx-auto mt-2 flex flex-row justify-start items-center">
            <h3 className="text-3xl ml-5 mr-2">see </h3>
            <a className="flex justify-center" >
              <button className="ml-1 mr-4 py-1 px-3 whitespace-nowrap bg-white hover:text-white hover:bg-black rounded-lg" id="home-button">
                <div className="flex flex-row">
                  <span className="mt-1">/about</span>
                  <img className="ml-2" src={logo} height="30" width="30" />
                </div>
              </button>
            </a>
            <h3 className="text-3xl">for more info</h3>
          </div>
          <div className="w-5/6 h-[450px] mx-auto flex overflow-x-auto overflow-y-hidden" id="hide-scrollbar">
            {odds.map((x) => {
              return arbNoSpreadMap(x) &&
                ArbNoSpreadCard(x);
            })}
          </div>
        </div>
      }
      {noArbNoSpread() && <div className="m-0 mb-24">
          <h1 className="w-5/6 mx-auto flex justify-start text-3xl font-bold mb-5" id="arb-title">Games with No Arbitrage Opportunities</h1>
          <div className="w-5/6 h-[450px] mx-auto flex overflow-x-auto overflow-y-hidden" id="hide-scrollbar">
            {odds.map((x) => {
              return noArbNoSpreadMap(x) &&
                NoArbCard(x);
            })}
          </div>
        </div>
      }
    </div>
  )
}