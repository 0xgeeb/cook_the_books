import { React, useState } from "react";
import { ethers } from "ethers";
import MetaMaskOnboarding from "@metamask/onboarding";
import MetaMaskLogo from ".././images/metamasklogo.png";
import smoke2 from ".././images/flip_smoke.png";
import logo from ".././images/colored_logo.png";
import AvaxLogo from ".././images/avax_logo.png";
import CTBPassABI from "../utils/CTBPass.json";

export default function Mint() {

  const [currentAccount, setCurrentAccount] = useState(null);
  const [avaxChain, setAvaxChain] = useState(null);
  const [loading, setLoading] = useState(false)

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

  const CONTRACT_ADDRESS = "0x8c9eA819aC469619F4acABa01F7F2270E8ABC5D1";

  const mmInstance = new MetaMaskOnboarding();

  async function connectWallet() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    setCurrentAccount(account);
  };
  
  async function switchToAvalancheChain() {
    await window.ethereum.request({ method: 'wallet_addEthereumChain', params: [AVALANCHE_TESTNET_PARAMS] });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { chainId } = await provider.getNetwork();
    if (chainId === 43113) {
      setAvaxChain(chainId);
    }
  };

  async function interactMintFunction() {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const passContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CTBPassABI.abi,
      signer
      );
    let overrides = {
      value: ethers.utils.parseEther((1).toString())
    };
    setLoading(current => !current);
    try {
      const mintTxn = await passContract.mintThePass(overrides);
      await mintTxn.wait();
      setLoading(current => !current);
    }
    catch {
      setLoading(current => !current);
    }
  };

  function renderContent() {
    if(!MetaMaskOnboarding.isMetaMaskInstalled()) {
      return  <div className="flex flex-col justify-center">
                <div className="mx-auto">you will need to install MetaMask to mint the nft</div>
                <button className="mx-auto py-1 px-3 mt-8 whitespace-nowrap bg-white hover:text-white hover:bg-black rounded-lg" id="home-button" onClick={mmInstance.startOnboarding}>
                  <div className="flex flex-row items-center">
                    <span>install metamask</span>
                    <img className="ml-2" src={MetaMaskLogo} height="30" width="30" />
                  </div>
                </button>
              </div>
    }
    else if(!currentAccount) {
      return  <div className="flex flex-col justify-center">
                <div className="mx-auto">connect your metamask wallet to the website plz</div>
                <button className="mx-auto py-1 px-3 mt-8 whitespace-nowrap bg-white hover:text-white hover:bg-black rounded-lg" id="home-button" onClick={connectWallet}>
                  <div className="flex flex-row items-center">
                    <span>connect wallet</span>
                    <img className="ml-2" src={MetaMaskLogo} height="30" width="30" />
                  </div>
                </button>
              </div>
    }
    else if(!avaxChain) {
      return  <div className="flex flex-col justify-center">
                <div className="mx-auto">plz hop on the Avalanche network</div>
                <button className="mx-auto py-1 px-3 mt-8 whitespace-nowrap bg-white hover:text-white hover:bg-black rounded-lg" id="home-button" onClick={switchToAvalancheChain}>
                  <div className="flex flex-row items-center">
                    <span>switch to red triangle</span>
                    <img className="ml-2" src={AvaxLogo} height="60" width="60" />
                  </div>
                </button>
              </div>
    }
    else {
      return  <div className="flex flex-col justify-center" >
                <div className="mx-auto">placeholder for nft info possibly</div>
                <button className="mx-auto py-1 px-3 mt-8 whitespace-nowrap bg-white hover:text-white hover:bg-black rounded-lg" id="home-button" onClick={interactMintFunction}>
                  <div className="flex flex-row items-center">
                    <span className="">mint pass</span>
                    <img className="ml-2" src={logo} height="30" width="30" />
                  </div>
                </button>
              </div>
    }
  }
  
  return (
    <div className="min-h-screen mb-10" style={{backgroundImage: `url(${smoke2})`}} id="background-div">
      <div className="p-7 w-1/4 bg-[#F7F7F7] flex flex-col justify-center mt-48 mx-auto rounded" id="card-div-shadow">
        <h1 className="mx-auto text-2xl font-bold text-cyan-400 mb-8">Mint your CTB Pass</h1>
        {renderContent()}
      </div>
      <div className="flex justify-center mt-6">
        {loading && <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
      </div>
    </div>
  )
}