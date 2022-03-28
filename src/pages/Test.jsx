import React, {useEffect, useState } from "react"
import data from "../decimal_ml_data.json"
import logos from "../logos.json"

export default function Odds() {

    const [odds, setOdds] = useState([])

    const params = {
        'sport': 'icehockey_nhl',
        'apiKey': process.env.REACT_APP_APIKEY,
        'regions': 'us',
        'markets': 'h2h'
    }
    
    // useEffect(() => {
        
        
        // }, [])




    async function fetchOdds() {
        const allGames = []
        for(let game in data) {
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
        console.log(allGames)
    }

    function getLogo(team) {
        for(let i in logos) {
            if(team == logos[i].team) {
                return logos[i].info.url
            }
        }
    }

    function getMath(home, away, max) {
        const homeBet = max/home
        const awayBet = max/away
        const profit = max - (homeBet+awayBet)
        console.log(`home ${homeBet} away ${awayBet} profit ${profit}`)
        return profit, homeBet
    }

    
    return (
        <div>
            <h1 className="text-emerald-400 flex justify-center mt-24 text-[80px] mb-24">testing page</h1>
            <div className="flex justify-center mb-24">
                <button 
                    className="bg-slate-200 text-black hover:bg-black rounded-3xl hover:text-slate-200 p-4 border-4 border-emerald-400"
                    onClick={fetchOdds}
                >
                    click me
                </button>
            </div>
            <div className="mt-12 ml-12 mr-12 mb-24">
                {odds.length > 1 && <h1 className="flex justify-center text-3xl mb-5">games with an arb</h1>}
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
                {odds.length > 1 && <h1 className="flex justify-center text-3xl mb-5">games with no arb</h1>}
                <div className="grid grid-cols-3 gap-4">
                    {odds.map((x) => {
                        return !x.arb && 
                            <div className="flex flex-col items-center border-2 border-red-400 rounded"> 
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





    //
    // https://stackoverflow.com/questions/70504702/how-to-push-objects-into-array-in-reactjs
    // use second comment from above link and include second useState for fetching the odds json
    // then use the useEffect bottom hook as the second useState
    // then have the button of the form onClick set the second useState