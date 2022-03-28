import React, {useEffect, useState } from "react"
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
        const response = await fetch(`https://api.the-odds-api.com/v4/sports/${params.sport}/odds/?apiKey=${params.apiKey}&regions=${params.regions}&markets=${params.markets}&oddsFormat=decimal`);
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
        console.log(allGames)
        console.log(obj)
    }

    function getLogo(team) {
        for(let i in logos) {
            if(team == logos[i].team) {
                return logos[i].info.url
            }
        }
    }

    
    return (
        <div>
            <h1 className="text-emerald-400 flex justify-center mt-24 text-[80px] mb-24">unbelievable levels of gucciness</h1>
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
                            <div className="flex flex-col items-center border-2 border-emerald-400 rounded"> 
                                <p className="mb-5">{x.home.name} - {x.away.name}</p>
                                <div className="grid grid-cols-2">
                                    <img src={getLogo(x.home.name)}/>
                                    <img src={getLogo(x.away.name)}/>
                                </div>
                                <p>$1000 bankroll would net ${(1000-((1000/x.home.line)+(1000/x.away.line))).toFixed(2)}</p>
                            </div>
                    })}
                </div>
            </div>
            <div className="m-12">
                {odds.length > 1 && <h1 className="flex justify-center text-3xl mb-5">games with no arb</h1>}
                <div className="grid grid-cols-3 gap-4">
                    {odds.map((x) => {
                        return !x.arb && 
                            <div className="flex flex-col items-center border-2 border-red-400 rounded h-48"> 
                                <p className="mb-5">{x.home.name} - {x.away.name}</p>
                                <div className="grid grid-cols-2">
                                    <img src={getLogo(x.home.name)}/>
                                    <img src={getLogo(x.away.name)}/>
                                    <span className="flex justify-center">{x.home.line}</span>
                                    <span className="flex justify-center">{x.away.line}</span>
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