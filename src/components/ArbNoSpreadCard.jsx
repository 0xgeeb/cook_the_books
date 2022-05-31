import React from "react";
import logos from "../utils/logos.json"

export default function ArbNoSpreadCard(x, bankroll) {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  function getLogo(team) {
    for (let i in logos) {
      if (team == logos[i].team) {
        return logos[i].info.url
      }
    }
    return "https://cdn.anime-pictures.net/previews/f59/f591ed67a9d7530d11e6b54865760063_sp.jpg"
  }

  function profitPercentage(homeLine, awayLine) {
    return (100 * (bankroll - ((bankroll / homeLine) + (bankroll / awayLine))) / ((bankroll / homeLine) + (bankroll / awayLine))).toFixed(2)
  }

  function profitAmount(homeLine, awayLine) {
    let profit = formatter.format(bankroll - ((bankroll / homeLine) + (bankroll / awayLine)));
    return profit
  }

  return (
    <div className="bg-[#F7F7F7] h-[400px] w-[550px] flex flex-col shrink-0 mb-96 mr-10 ml-2 mt-2 rounded" key={x.home.id} id="card-div-shadow">
      <h2 className="mx-auto text-2xl mt-5 border-b-2 border-gray-200 text-yellow-500"><b>{profitPercentage(x.home.line, x.away.line)}%</b> return</h2>
      <div className="mx-auto h-32 w-5/6 flex flex-row items-center mb-5">
        <img src={getLogo(x.home.name)} />
        <p className="ml-10 w-[300px]">bet <b>{formatter.format(bankroll / x.home.line)}</b> on the {x.home.name} <b>({x.home.spread})</b> on {x.home.book} for <b>{x.home.line}</b></p>
      </div>
      <div className="mx-auto h-32 w-5/6 flex flex-row items-center border-t-2 border-gray-200">
        <img src={getLogo(x.away.name)} />
        <p className="ml-10 w-[300px]">bet <b>{formatter.format(bankroll / x.away.line)}</b> on the {x.away.name} <b>({x.away.spread})</b> on {x.away.book} for <b>{x.away.line}</b></p>
      </div>
      <h2 className="mx-auto text-lg mt-2 mb-5 border-b-2 border-gray-200"><b>{profitAmount(x.home.line, x.away.line)}</b> profit on a total bet of <b>{formatter.format((bankroll / x.home.line) + (bankroll / x.away.line))}</b></h2>
    </div>
  )
}