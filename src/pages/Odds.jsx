import React, {useEffect, useState } from "react"
import data from "../decimal_ml_data.json"

export default function Odds() {
    
    const [odds, setOdds] = useState([])
    
    // useEffect(() => {
        
        
        // }, [])

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

    
    function updateState() {
        setOdds([])
        for(let i in allGames) {
            setOdds((prevOdds) => {
                const newState = [...prevOdds]
                newState.push(allGames[i])
                return newState
            })
        }
    }
    
    
    
    console.log(allGames)
    console.log(odds)

    
    
    
    return (
        <div>
            <h1 className="text-emerald-400 flex justify-center mt-24 text-[80px]">completey non-perverted placeholder</h1>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="flex justify-center">
                <button 
                    className="bg-slate-200 text-black hover:bg-black rounded-3xl hover:text-slate-200 p-4 border-4 border-emerald-400"
                    onClick={updateState}
                >
                    click me
                </button>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="px-10 grid grid-cols-3 gap-3">
                {odds.map((x) => 
                    <div className="flex flex-col items-center border-2 border-emerald-400 rounded">
                        <p className="mb-5">{x.home.name} - {x.away.name}</p>
                        <p>$1000 bankroll would net ${(1000-((1000/x.home.line)+(1000/x.away.line))).toFixed(2)}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

    //
    // https://stackoverflow.com/questions/70504702/how-to-push-objects-into-array-in-reactjs
    // use second comment from above link and include second useState for fetching the odds json
    // then use the useEffect bottom hook as the second useState
    // then have the button of the form onClick set the second useState