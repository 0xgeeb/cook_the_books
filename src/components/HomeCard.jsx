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

  console.log(x);

  return (
    <div className="bg-[#F7F7F7] h-[400px] w-[550px] flex flex-col shrink-0 mb-96 mr-10 ml-2 mt-2 rounded" key={x.home.id} id="card-div-shadow">
      <h2 className="mx-auto text-2xl mt-5 border-b-2 border-gray-200 text-green-500"><b>{profitPercentage(x.home.line, x.away.line)}%</b> return</h2>
      <div className="mx-auto h-[50%] w-5/6 flex flex-row items-center mb-5">
        <img className="" src={getLogo(x.home.name)} />
        <p className="ml-10 w-[300px]">{x.home.name} for <b>{x.home.line}</b></p>
      </div>
      <div className="mx-auto h-[50%] w-5/6 flex flex-row items-center border-t-2 border-gray-200">
        <img className="" src={getLogo(x.away.name)} />
        <p className="ml-10 w-[300px]">{x.away.name} for <b>{x.away.line}</b></p>
      </div>
    </div>
  )
}