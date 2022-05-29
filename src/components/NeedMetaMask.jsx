import React from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import MetaMaskLogo from ".././images/metamasklogo.png";

export default function NeedMetaMask() {

  const mmInstance = new MetaMaskOnboarding();

  return (
    <div className="flex flex-col justify-center">
      <div className="mx-auto">you will need to install MetaMask to mint the nft</div>
      <button className="mx-auto py-1 px-3 mt-8 whitespace-nowrap bg-white hover:text-white hover:bg-black rounded-lg" id="home-button" onClick={mmInstance.startOnboarding}>
        <div className="flex flex-row items-center">
          <span>install metamask</span>
          <img className="ml-2" src={MetaMaskLogo} height="30" width="30" />
        </div>
      </button>
    </div>
  )
}