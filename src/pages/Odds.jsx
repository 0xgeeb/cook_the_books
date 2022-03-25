import React, {useEffect, useState } from "react"
import data from "../ml_data.json"

export default function Odds() {

    const [odds, setOdds] = useState({
        home_team: ""
    })

    useEffect(() => {
        for(let game in data) {
            const home_odds_object = {}
            const away_odds_object = {}
            for(let book in data[game]["bookmakers"]) {
                let home_book = data[game]["bookmakers"][book]["title"]
                let away_book = data[game]["bookmakers"][book]["title"]
                let home_num = data[game]["bookmakers"][book]["markets"][0]["outcomes"][0]["price"]
                let away_num = data[game]["bookmakers"][book]["markets"][0]["outcomes"][1]["price"]
                if(home_num > 0) {
                    home_num = ((home_num/100)+1).toFixed(6)
                    home_odds_object[home_book] = home_num
                }
                if(home_num < 0) {
                    home_num = ((100/(-home_num))+1).toFixed(6)
                    home_odds_object[home_book] = home_num
                }
                if(away_num > 0) {
                    away_num = ((away_num/100)+1).toFixed(6)
                    away_odds_object[away_book] = away_num
                }
                if(away_num < 0) {
                    away_num = ((100/(-away_num))+1).toFixed(6)
                    away_odds_object[away_book] = away_num
                }
            }
            let hoov = Object.values(home_odds_object)
            let aoov = Object.values(away_odds_object)
            let opp = Math.max(...hoov)
            let away_opp = Math.max(...aoov)
            let arb = (1/opp) + (1/away_opp)
            setOdds(prevOdds => ({
                ...prevOdds,
                home_team: data[game]["home_team"]
            }))
            console.log()
        }
    }, [])

    function renderOdds() {
        return (
            <h1 className="text-emerald-400 flex justify-center mt-24 text-[80px]">{odds.home_team}</h1>
        )
    }

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
            <br />
            <div>
                {renderOdds()}
            </div>
        </div>
    )
}