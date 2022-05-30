import React from "react";
import about_image from ".././images/about_image.png";
import logo from ".././images/colored_logo.png"
import about__image from ".././images/about__image.png";

export default function About() {
  return (
    <div className="h-[2000px]" style={{backgroundImage: `url(${about__image})`}} id="about-background-div">
      <div className="flex lg:justify-center w-5/6 lg:w-1/3 mx-auto mt-36">
        <div className="flex flex-col justify-start w-5/6 lg:w-[100%]">
          <div className="flex flex-col justify-start mb-12">
            <div className="flex flex-row items-end">
              <h1 className="font-bold text-2xl mr-2">What is Cook the Books?</h1>
              <img src={logo} height="40" width="40"/>
            </div>
            <p className="mt-2">
              Cook the Books is a dapp on the Avalanche network that provides sport betting arbitrage opportunities. Users must mint the NFT or "CTB Pass" to use the dapp. The first 5% of passes can be minted for free while the remaining cost 1 $AVAX.
            </p>
          </div>
          <div className="flex flex-col justify-start mb-12">
            <h1 className="font-bold text-2xl">Sports Betting Arbitrage?</h1>
            <p className="mt-2">
              An arbitrage in the context of sports betting is placing multiple bets on the same game to guarantee a profit no matter the result of the game. This is made possible by aggregating the odds of a game from many sportsbooks to find opportunities where placing a bet on the same game across different books would secure an arbitrage or guaranteed profit.
            </p>
          </div>
          <div className="flex flex-col justify-start mb-12">
            <h1 className="font-bold text-2xl">What is the Spread Difference?</h1>
            <p className="mt-2">
              If the sum of the spreads of a game does not equal 0 (Los Angeles Lakers @ +3 & San Antonio Spurs @ -5), there is a chance that the end result of the game does not result in a win for either of your bets, (Spurs winning by 4). This would end with both of your bets losing, leaving you with $0 instead of a risk-free return. So while looking at the odds for spreads there might be an arbitrage opportunity, but there is a small chance you could lose it all.
            </p>
          </div>
          <div className="flex flex-col justify-start mb-12">
            <h1 className="font-bold text-2xl">How was this built?</h1>
            <p className="mt-2">
              This website was built using the MERN tech stack. That being Mongo for the database, Node & Express for the server, and React for the front end. CSS library used is Tailwinds. Cloudinary and Heroku are used for photo and web hosting. I used Solidity and Hardhat to write and test the smart contract that I deployed on the Avalanche blockchain. The Ethers js library is used to interact with the smart contract from the front end. I used nft.storage to include ipfs links to the NFT metadata on chain.
            </p>
          </div>
          <div className="flex flex-col justify-start mb-12">
            <h1 className="font-bold text-2xl">Contract Address?</h1>
            <p className="mt-2">
            <b>CTB Pass Contract Address:</b> random address
            </p>
          </div>
          <div className="flex flex-col justify-start mb-12">
            <h1 className="font-bold text-2xl">Shameless Plug</h1>
            <p className="mt-2">
              Do you like this website and have a project/idea that you need help bringing to life? Are you looking for a new developer for your team? Please reach out! I would love to collaborate and help you with the task and also help build up my developer resume. @0xgeeb on twitter or 0xgeeb#6249 on discord
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}