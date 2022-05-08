import React from "react";
import logos from "../utils/logos.json"

export default function Card(x) {

  function getLogo(team) {
    for (let i in logos) {
      if (team == logos[i].team) {
        return logos[i].info.url
      }
    }
    return "https://cdn.anime-pictures.net/previews/f59/f591ed67a9d7530d11e6b54865760063_sp.jpg"
  }

  function profitPercentage(homeLine, awayLine) {
    return (100 * (1000 - ((1000 / homeLine) + (1000 / awayLine))) / ((1000 / homeLine) + (1000 / awayLine))).toFixed(2)
  }

  return (
    <div className="h-48 w-48 border-neutral-600 rounded border-2 flex flex-col">
      <div className="grid grid-cols-2 m-2">
        <img src={getLogo(x.home.name)} />
        <img src={getLogo(x.away.name)} />
      </div>
    </div>
  )
}