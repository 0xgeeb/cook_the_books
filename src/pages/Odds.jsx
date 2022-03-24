import React from "react"
import data from "../data.json"

export default function Odds() {
    
    const mf_data = JSON.stringify(data)

    for(let i = 0; i < data.length; i++) {
        const home_odds_dict = {}
        const away_odds_dict = {}
        let outcomes_array = []
        for(let book in data[i]["bookmakers"]) {
            outcomes_array = data[i]["bookmakers"][book]["markets"]["outcomes"];
            outcomes_array.forEach((shit) => {
                console.log(shit.name)
            })
        }
    }

    console.log(data)






    return (
        <div>
            <h1 className="text-emerald-400 flex justify-center mt-24 text-[80px]">plz fuck me daddy</h1>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <p>{mf_data}</p>
        </div>
    )
}