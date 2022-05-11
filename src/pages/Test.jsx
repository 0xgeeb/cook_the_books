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
    <div>
    {/* <div className="" style={{backgroundImage: `url(${smoke2})`}} id="background-div"> */}
      <div className="w-1/3 bg-neutral-200 border-neutral-600 rounded border-2 flex flex-col justify-center mt-24 mb-96 mx-auto" id="home-button">
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
          {arb && <h1 className="w-5/6 mx-auto flex justify-start text-3xl font-bold mb-5">Games with Arbitrage Opportunities</h1>}
          <div className="bg-[#F7F7F7] w-5/6 h-[450px] mx-auto flex overflow-x-auto overflow-y-hidden">
            {odds.map((x) => {
              // return Card(x);
              return (
                <div className="h-[400px] w-[550px] flex flex-col shrink-0 mb-96 mr-10 ml-2 mt-2 rounded" key={x.home.id} id="card-div-shadow">
                  <h2 className="mx-auto text-2xl mt-5 border-b-2 border-gray-200 text-green-500"><b>{profitPercentage(x.home.line, x.away.line)}%</b> Return</h2>
                  <div className="mx-auto h-32 w-5/6 flex flex-row justify-start items-center mb-5">
                    <img className="" src={getLogo(x.home.name)} />
                    <p className="ml-10 w-[300px]">bet <b>${(1000 / x.home.line).toFixed(2)}</b> on the {x.home.name} on {x.home.book} for <b>{x.home.line}</b></p>
                  </div>
                  <div className="mx-auto h-32 w-5/6 flex flex-row justify-start items-center border-t-2 border-gray-200">
                    <img className="" src={getLogo(x.away.name)} />
                    <p className="ml-10 w-[300px]">bet <b>${(1000 / x.away.line).toFixed(2)}</b> on the {x.away.name} on {x.away.book} for <b>{x.away.line}</b></p>
                  </div>
                  <h2 className="mx-auto text-lg mt-2 mb-5 border-b-2 border-gray-200"><b>${(1000 - ((1000 / x.home.line) + (1000 / x.away.line))).toFixed(2)}</b> profit on a total bet of <b>${((1000 / x.home.line) + (1000 / x.away.line)).toFixed(2)}</b></h2>
                </div>
              )
            })}
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
    {/* </div> */}
    </div>
  )
}