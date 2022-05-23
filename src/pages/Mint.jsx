import { React, useEffect, useState } from "react";
import { ethers } from "ethers";
import smoke2 from ".././images/flip_smoke.png";
import logo from ".././images/colored_logo.png";

export default function Mint() {

  const AVALANCHE_MAINNET_PARAMS = {
    chainId: '0xA86A',
    chainName: 'Avalanche Mainnet C-Chain',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://snowtrace.io/']
  };

  const AVALANCHE_TESTNET_PARAMS = {
    chainId: '0xA869',
    chainName: 'Avalanche Testnet C-Chain',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://testnet.snowtrace.io/']
  };

  useEffect(() => {
    async function getMetaMask() {
      const { ethereum } = window;
  
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        await provider.send("eth_requestAccounts", []);
        console.log('asking for metamask');
        const signer = provider.getSigner();
      }
      else {
        console.log('no ethereum object found');
      }
    }
    getMetaMask();
  }, []);









  return (
    <div className="min-h-screen mb-10" style={{backgroundImage: `url(${smoke2})`}} id="background-div">
      <div className="p-7 w-1/4 bg-[#F7F7F7] flex flex-col justify-center mt-48 mb-48 mx-auto rounded" id="card-div-shadow">
        <h1 className="mx-auto text-2xl font-bold text-cyan-400 mb-8">Mint your CTB Pass</h1>
        <a className="flex justify-center" >
          <button className="ml-1 mr-4 py-1 px-3 mt-8 whitespace-nowrap bg-white hover:text-white hover:bg-black rounded-lg" id="home-button">
            <div className="flex flex-row">
              <span className="mt-1">mint pass</span>
              <img className="ml-2" src={logo} height="30" width="30" />
            </div>
          </button>
        </a>
      </div>
    </div>
  )
}