import { React, useState } from "react";
import { ethers } from "ethers";
import MetaMaskOnboarding from "@metamask/onboarding";
import MetaMaskLogo from ".././images/metamasklogo.png";
import smoke2 from ".././images/flip_smoke.png";
import logo from ".././images/colored_logo.png";
import AvaxLogo from ".././images/avax_logo.png";
import CTBPassABI from "../utils/CTBPass.json";
import Pass from ".././images/ctb_pass.png";
import OGPass from ".././images/ctb_og_pass.png";

export default function Mint() {

  const [currentAccount, setCurrentAccount] = useState(null);
  const [avaxChain, setAvaxChain] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);

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

  const CONTRACT_ADDRESS = "0x9BF4C0F67Ab65996E15889B493eCb23a9153e31a";

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
    };
    const signer = provider.getSigner();
    const passContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CTBPassABI.abi,
      signer
      );
    const checkIdTxn = await passContract.checkTokenId();
    setCurrentId(parseInt(checkIdTxn._hex, 16) - 1);
  };

  async function interactMintFunction() {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const passContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CTBPassABI.abi,
      signer
    );
    setLoading(current => !current);
    if (currentId >= 2) {
      let overrides = {
        value: ethers.utils.parseEther((1).toString())
      };
      try {
        const mintTxn = await passContract.mintThePass(overrides);
        await mintTxn.wait();
        setLoading(current => !current);
      }
      catch {
        setLoading(current => !current);
      }
    }
    else {
      try {
        const mintTxn = await passContract.mintThePass();
        await mintTxn.wait();
        setLoading(current => !current);
      }
      catch {
        setLoading(current => !current);
      }
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
                <div className="mx-auto">{currentId} / 10,000 CTB Passes have been minted</div>
                {currentId < 1000 && <div className="mx-auto">{1000 - currentId} OG Passes are available to be minted</div>}
                {currentId >= 1000 && <div className="mx-auto">sorry there are no more OG passes left</div>}
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
      <div className="w-5/6 mx-auto mt-[600px] mb-24 flex flex-col">
        <h1 className="text-3xl mx-auto font-bold mb-5" id="arb-title">Mint one of the NFTs to gain access to CTB</h1>
        <div className="flex flex-row justify-center">
          <img className="h-[490px] mr-48" src={OGPass} />
          <img className="h-[490px]" src={Pass} />
        </div>
      </div>
    </div>
  )
}