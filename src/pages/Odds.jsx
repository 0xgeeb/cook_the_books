import React, {useEffect, useState } from "react"
import logos from "../logos.json"
import logo from "../.././public/images/logo.png"

export default function Odds() {

    const [odds, setOdds] = useState([])
    const [inputs, setInputs] = useState({})
    const [sport, setSport] = useState('')
    const [bet, setBet] = useState('')
    const [arb, setArb] = useState(false)
    const [noArb, setNoArb] = useState(false)

    
    useEffect(() => {
        async function fetchOdds() {
            const response = await fetch(`https://api.the-odds-api.com/v4/sports/${inputs.sport}/odds/?apiKey=${process.env.REACT_APP_APIKEY}&regions=us&markets=${inputs.bet}&oddsFormat=decimal`);
            const data = await response.json()
            const obj = {...data}
            const allGames = []
            for(let game in obj) {
                const gameObject = {}
                const homeOddsArray = []
                const awayOddsArray = []
                for(let book in data[game]["bookmakers"]) {    
                    if(data[game]["bookmakers"][book]["key"] == "betfair") {
                        continue
                    }
                    const bookCut = data[game]["bookmakers"][book]
                    const outcomesCut = bookCut["markets"][0]["outcomes"]
                    const homeObject = {
                        "name": outcomesCut[0]["name"],
                        "book": bookCut["title"],
                        "line": outcomesCut[0]["price"]
                    }
                    const awayObject = {
                        "name": outcomesCut[1]["name"],
                        "book": bookCut["title"],
                        "line": outcomesCut[1]["price"]
                    }
                    homeOddsArray.push(homeObject)
                    awayOddsArray.push(awayObject)
                }
                const opp = homeOddsArray.reduce(function(prev, current) {
                    return (prev.line > current.line) ? prev : current
                })
                const awayOpp = awayOddsArray.reduce(function(prev, current) {
                    return (prev.line > current.line) ? prev : current
                })
                const arb = (1/opp.line) + (1/awayOpp.line)
                if(arb > 1) {
                    gameObject = {
                        "home": opp,
                        "away": awayOpp,
                        "arb": false
                    }
                }
                else {
                    gameObject = {
                        "home": opp,
                        "away": awayOpp,
                        "arb": true
                    }
                }
                allGames.push(gameObject)
            }
            setOdds([])
            for(let i in allGames) {
                setOdds((prevOdds) => {
                    const newState = [...prevOdds]
                    newState.push(allGames[i])
                    return newState
                })
            }
            for(let i in allGames) {
                if (allGames[i].arb) {
                    setArb(current => !current)
                    break
                }
            }
            for(let i in allGames) {
                if (!allGames[i].arb) {
                    setNoArb(current => !current)
                    break
                }
            }
            console.log(allGames)
            console.log(data)
        }
        fetchOdds()
    }, [inputs])



    function getLogo(team) {
        for(let i in logos) {
            if(team == logos[i].team) {
                return logos[i].info.url
            }
        }
        return "https://cdn.anime-pictures.net/previews/f59/f591ed67a9d7530d11e6b54865760063_sp.jpg"
    }

    function handleSubmit(event) {
        event.preventDefault();
        setInputs({})
        setInputs(prevInputs => ({
            ...prevInputs,
            "sport": sport,
            "bet": bet
        }))
    }
    
    return (
        <div>
            <h1 className="text-emerald-400 flex justify-center mt-24 text-[80px]">secret testing grounds</h1>
            <div className="flex justify-center mb-24">
                <img className="h-20 w-20" src={logo}/>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex justify-center mb-12">
                    <div className="grid grid-cols-2 gap-4">
                        <label htmlFor="sport">select a sport</label>
                        <label htmlFor="bet">ML or spreads?</label>
                        <select name="sport" id="sport" onChange={(e) => setSport(e.target.value)}>
                            <option></option>
                            <option value="basketball_nba">NBA</option>
                            <option value="icehockey_nhl">NHL</option>
                            <option value="basketball_ncaab">NCAA</option>
                        </select>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="radio" id="h2h" name="betradio" onChange={(e) => setBet(e.target.id)}/>
                            <input type="radio" id="spreads" name="betradio" onChange={(e) => setBet(e.target.id)}/>
                            <label htmlFor="h2h">moneyline</label>
                            <label htmlFor="spreads">spreads</label>
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
            {odds.length < 1 && <div className="mb-96"></div>}
            <div className="mt-12 ml-12 mr-12 mb-24">
                {arb && <h1 className="flex justify-center text-3xl mb-5">games with an arb</h1>}
                <div className="grid grid-cols-2 gap-4">
                    {odds.map((x) => {
                        return x.arb && 
                            <div className="flex flex-col items-center border-2 border-emerald-400 rounded pb-4"> 
                                <p className="mb-5 mt-2">{x.home.name} - {x.away.name}</p>
                                <div className="grid grid-cols-2">
                                    <img className="place-self-end" src={getLogo(x.home.name)}/>
                                    <p className="self-center place-self-center">{`bet $${(1000/x.home.line).toFixed(2)} on ${x.home.book} for ${x.home.line}`}</p>
                                    <img className="place-self-end" src={getLogo(x.away.name)}/>
                                    <p className="self-center place-self-center">{`bet $${(1000/x.away.line).toFixed(2)} on ${x.away.book} for ${x.away.line}`}</p>
                                </div>
                                <p className="flex justify-center mt-4">{`$${(1000-((1000/x.home.line)+(1000/x.away.line))).toFixed(2)} profit on a total bet of $${((1000/x.home.line)+(1000/x.away.line)).toFixed(2)} for a risk-free ${(100*(1000-((1000/x.home.line)+(1000/x.away.line)))/((1000/x.home.line)+(1000/x.away.line))).toFixed(2)}`}%</p>
                            </div>
                    })}
                </div>
            </div>
            <div className="m-12">
                {noArb && <h1 className="flex justify-center text-3xl mb-5">games with no arb</h1>}
                <div className="grid grid-cols-3 gap-4">
                    {odds.map((x) => {
                        return !x.arb && 
                            <div className="flex flex-col items-center border-2 border-red-400 rounded pb-2"> 
                                <p className="mb-5 mt-2">{x.home.name} - {x.away.name}</p>
                                <div className="grid grid-cols-2">
                                    <img src={getLogo(x.home.name)}/>
                                    <img src={getLogo(x.away.name)}/>
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