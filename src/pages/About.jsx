import React from "react";
import colored_logo from ".././images/colored_logo.png"

export default function About() {
  return (
    <div className="flex flex-col justify-center w-1/3 mx-auto mt-36">
      <div className="flex flex-col justify-start mb-12">
        <div className="flex flex-row items-end">
          <h1 className="font-bold text-2xl mr-2">What is Cook the Books?</h1>
          <img src={colored_logo} height="40" width="40"/>
        </div>
        <p className="mt-2">
          Cook the Books is a web3 application that provides sport betting arbitrage opportunities for its users. Users must mint the NFT or "CTB Pass" in order to use the application. A portion of the passes can be minted for free while the rest cost 1 $AVAX.
        </p>
      </div>
      <div className="flex flex-col justify-start mb-12">
        <h1 className="font-bold text-2xl">Sports Betting Arbitrage?</h1>
        <p className="mt-2">
          An arbitrage in the context of sports betting is placing multiple bets on the same game to guarantee a profit no matter the result of the game. This is made possible by aggregating the odds of a game from many sportsbooks to find opportunities where placing a bet on the same game across different books would secure an arbitrage or guaranteed profit.
        </p>
      </div>
      <div className="flex flex-col justify-start mb-72">
        <h1 className="font-bold text-2xl">What is the Spread Difference?</h1>
        <p className="mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque modi dicta culpa quae sit vitae, perspiciatis incidunt quisquam vero odio nulla, est neque maxime nam et consectetur excepturi ab numquam.
        </p>
      </div>
    </div>
  )
}