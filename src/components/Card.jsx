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
    <div className="flex flex-col items-center border-2 border-cyan-400 rounded pb-4" key={x.home.id}>
      <p className="mb-5 mt-2">{x.home.name} - {x.away.name}</p>
      <div className="grid grid-cols-2">
        <img className="place-self-end" src={getLogo(x.home.name)} />
        <p className="self-center place-self-center">{`bet $${(1000 / x.home.line).toFixed(2)} on ${x.home.book} for ${x.home.line}`}</p>
        <img className="place-self-end" src={getLogo(x.away.name)} />
        <p className="self-center place-self-center">{`bet $${(1000 / x.away.line).toFixed(2)} on ${x.away.book} for ${x.away.line}`}</p>
      </div>
      <p className="flex justify-center mt-4">{`$${(1000 - ((1000 / x.home.line) + (1000 / x.away.line))).toFixed(2)} profit on a total bet of $${((1000 / x.home.line) + (1000 / x.away.line)).toFixed(2)} for a risk-free ${profitPercentage(x.home.line, x.away.line)}`}%</p>
    </div>
  )
}