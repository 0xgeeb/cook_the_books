import { React, useState } from "react";
import { ethers } from "ethers";
import obj from "../utils/spreads.json";
// import obj from "../utils/decimal_ml_data.json";
import logo from ".././images/colored_logo.png";
import odds_image from ".././images/odds_image.png";
import Card from "../components/Card.jsx";
import NoArbCard from "../components/NoArbCard.jsx";
import NeedMetaMask from "../components/NeedMetaMask.jsx";
import ArbNoSpreadCard from "../components/ArbNoSpreadCard.jsx";
import AvaxLogo from ".././images/avax_logo.png";
import CTBPassABI from "../utils/CTBPass.json";
import MetaMaskOnboarding from "@metamask/onboarding";
import MetaMaskLogo from ".././images/metamasklogo.png";
import axios from "axios";

export default function Test() {

  const [odds, setOdds] = useState([]);
  const [sport, setSport] = useState('');
  const [bet, setBet] = useState('');
  const [bankroll, setBankroll] = useState(1000);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [avaxChain, setAvaxChain] = useState(null);
  const [arb, setArb] = useState(false);
  const [errorAPI, setErrorAPI] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasPass, setHasPass] = useState(false);
  const [sportError, setSportError] = useState(false);
  const [betError, setBetError] = useState(false);

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
    const membershipProvider = new ethers.providers.Web3Provider(ethereum);
    const signer = membershipProvider.getSigner();
    const passContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CTBPassABI.abi,
      signer
    );
    const txn = await passContract.checkMembershipStatus();
    if (txn == 1) {
      setHasPass(current => !current);
    }
  };
  
  function handleSubmit(event) {
    event.preventDefault();
    if(!sport || !bet) {
      if (!sport) {
        setSportError(true);
      }
      if(!bet) {
        setBetError(true);
      }
    }
    else {
      setSportError(false);
      setBetError(false);
      fetchOdds();
    }
  };
  
  async function fetchOdds() {
    setLoading(current => !current)
    // const response = await axios.get(`/minecraftspeedrun/bets/?sport=${sport}&bet=${bet}`);
    // console.log(response.data)
    // if(response.data == "error") {
      // setErrorAPI(true);
    // }
    // else {
    //   const obj = {...response.data}
      calcArbs(obj);
    // }
    setLoading(current => !current)
  };
  
  function calcArbs(obj) {
    const allGames = []
    for (let game in obj) {
      let gameObject = {}
      let homeObject = {}
      let awayObject = {}
      let homeOddsArray = []
      let awayOddsArray = []
      for (let book in obj[game]["bookmakers"]) {
        if (obj[game]["bookmakers"][book]["key"] == "betfair") {
          continue
        }
        const bookCut = obj[game]["bookmakers"][book]
        const outcomesCut = bookCut["markets"][0]["outcomes"]
        if (bet == "spreads") {
          homeObject = {
            "name": outcomesCut[0]["name"],
            "book": bookCut["title"],
            "line": outcomesCut[0]["price"],
            "id": obj[game]["id"],
            "spread": outcomesCut[0]["point"]
          }
          awayObject = {
            "name": outcomesCut[1]["name"],
            "book": bookCut["title"],
            "line": outcomesCut[1]["price"],
            "id": obj[game]["id"],
            "spread": outcomesCut[1]["point"]
          }
        }
        else {
          homeObject = {
            "name": outcomesCut[0]["name"],
            "book": bookCut["title"],
            "line": outcomesCut[0]["price"],
            "id": obj[game]["id"]
          }
          awayObject = {
            "name": outcomesCut[1]["name"],
            "book": bookCut["title"],
            "line": outcomesCut[1]["price"],
            "id": obj[game]["id"]
          }
        }
        homeOddsArray.push(homeObject)
        awayOddsArray.push(awayObject)
      }
      const opp = homeOddsArray.reduce(function (prev, current) {
        return (prev.line > current.line) ? prev : current
      })
      const awayOpp = awayOddsArray.reduce(function (prev, current) {
        return (prev.line > current.line) ? prev : current
      })
      const arb = (1 / opp.line) + (1 / awayOpp.line)
      if (arb > 1) {
        gameObject = {
          "home": opp,
          "away": awayOpp,
          "arb": false,
          "spread": true
        }
      }
      else {
        gameObject = {
          "home": opp,
          "away": awayOpp,
          "arb": true,
          "spread": true
        }
        if (bet == "spreads") {  
          if (opp.spread+awayOpp.spread != 0) {
            gameObject = {
              "home": opp,
              "away": awayOpp,
              "arb": false,
              "spread": false
            }
          }
        }
      }
      // for testing purposes
      // console.log(arb)
      allGames.push(gameObject)
      // if (profitPercentage(gameObject.home.line, gameObject.away.line) > 20) {
      //   uploadToDB(gameObject);
      // }
    }
    // for testing purposes
    // console.log(allGames)
    setOdds([])
    for (let i in allGames) {
      setOdds((prevOdds) => {
        const newState = [...prevOdds]
        newState.push(allGames[i])
        return newState
      })
    }
    setArb(false)
    for (let i in allGames) {
      if (allGames[i].arb) {
        setArb(current => !current)
        break
      }
    }
  };
  
  function profitPercentage(homeLine, awayLine) {
    return (100 * (1000 - ((1000 / homeLine) + (1000 / awayLine))) / ((1000 / homeLine) + (1000 / awayLine))).toFixed(2)
  };
  
  async function uploadToDB(gameObject) {
    await axios.post('/minecraftspeedrun/db', gameObject);
  };

  function arbNoSpread() {
    for(let i in odds) {
      if (!odds[i].spread) {
        return true
      }
    }
  };
  
  function arbNoSpreadMap(object) {
    if(!object.arb && !object.spread) {
      return true
    }
  };

  function noArbNoSpread() {
    for(let i in odds) {
      if (!odds[i].arb && odds[i].spread) {
        return true
      }
    }
  };

  function noArbNoSpreadMap(object) {
    if(!object.arb && object.spread) {
      return true
    }
  };

  function renderContent() {
    if(!MetaMaskOnboarding.isMetaMaskInstalled()) {
      return  NeedMetaMask();
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
    else if(!hasPass) {
      return  <div className="flex flex-col justify-center">
                <div className="mx-auto">oh no you don't have a CTB pass :(</div>
                <div className="mx-auto mt-4">head over to the mint page to mint one</div>
                <a href="/mint" className="flex justify-center mt-8">
                  <button className="ml-1 mr-4 py-1 px-3 whitespace-nowrap bg-white hover:text-white hover:bg-black rounded-lg" id="home-button">
                    <div className="flex flex-row">
                      <span className="mt-1">/mint</span>
                      <img className="ml-2" src={logo} height="25" width="25" />
                    </div>
                  </button>
                </a>
              </div>
    }
    else {
      return  <div className="flex flex-col justify-center">
      <h1 className="mx-auto text-2xl font-bold text-black mb-8 border-b-2 border-cyan-400" id="arb-title">Select a Sport and Type of Bet</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row justify-around ml-0">
          <span>sport (NBA, MLB, or NHL)</span>
          <span>bet (moneyline or spreads)</span>
        </div>
        <div className="flex flex-row justify-around">
          <select className={`rounded py-3 w-64 ${sportError ? "bg-red-500" : "bg-cyan-300"}`} name="sport" id="sport" onChange={(e) => setSport(e.target.value)}>
            <option hidden></option>
            <option value="basketball_nba">NBA</option>
            <option value="baseball_mlb">MLB</option>
            <option value="icehockey_nhl">NHL</option>
          </select>
          <select className={`rounded py-3 w-64 ${betError ? "bg-red-500" : "bg-cyan-300"}`} name="bet" id="bet" onChange={(e) => setBet(e.target.value)}>
            <option hidden></option>
            <option value="h2h">moneyline</option>
            <option value="spreads">spreads</option>
          </select>
        </div>
        <div className="flex flex-row justify-around">
          <span className={`${sportError ? "text-red-500" : "text-[#F7F7F7]"} mt-2`}>please select a sport</span>
          <span className={`${betError ? "text-red-500" : "text-[#F7F7F7]"} mt-2`}>please select a bet</span> 
        </div>
        <div className="flex justify-center mb-1 mt-3">
          <span>bankroll (optional)</span>
        </div>
        <div>
          <div className="w-1/2 flex justify-center mx-auto relative">
            <div className="absolute inset-y-0 left-20 flex items-center pointer-events-none">
              <span className="text-gray-500"> $ </span>
            </div>
            <input type="number" value={bankroll} id="bankroll-input" className="w-36 pl-8 pr-1 bg-cyan-300 rounded" onChange={(e) => setBankroll(e.target.value)}></input>
          </div>
        </div>
        <a className="flex justify-center" >
          <button className="ml-1 mr-4 py-1 px-3 mt-8 whitespace-nowrap bg-white hover:text-white hover:bg-black rounded-lg" id="home-button">
            <div className="flex flex-row">
              <span className="mt-1">find arbs</span>
              <img className="ml-2" src={logo} height="30" width="30" />
            </div>
          </button>
        </a>
      </form>
      {errorAPI && <div className="flex flex-col mx-auto justify-center w-5/6 mt-5 ">
        <p className="mx-auto">this is awkward but my api key has seem to hit its limit</p>
        <p className="mx-auto">could you let me know you are seeing this?</p>
        <div className="flex flex-row justify-center items-center mt-3">
          <p className="mr-10">@0xgeeb </p>
          <a href="https://twitter.com/0xgeeb" rel="noopener noreferrer" target="_blank" className="">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="twitter"
                className="svg-inline--fa fa-twitter w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
              <path
                fill="currentColor"
                d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
              ></path>
              </svg>
            </a>
        </div>
        <p className="mx-auto mt-3">0xgeeb#6249 on discord</p>
        <p className="mx-auto mt-3">thanks!</p>
        </div>}
    </div>
    }
  };

  return (
    <div className="h-[2700px]" style={{backgroundImage: `url(${odds_image})`}} id="background-div">
      <div className="p-7 w-5/6 lg:w-1/3 bg-[#F7F7F7] flex flex-col justify-center mt-48 mb-48 mx-auto rounded" id="card-div-shadow">
        {renderContent()}
      </div>
      <div className="flex justify-center">
        {loading && <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
      </div>
      {arb && <div className="m-0 mb-24">
          <div className="w-5/6 mx-auto flex justify-start mb-5">
            <h1 className="text-3xl font-bold pb-1 border-b-2 border-gray-200" id="arb-title">Games with Arbitrage Opportunities</h1>
          </div>
          <div className="w-5/6 h-[450px] mx-auto flex overflow-x-auto overflow-y-hidden" id="hide-scrollbar">
            {odds.map((x) => {
              return x.arb &&
                Card(x, bankroll);
            })}
          </div>
        </div>
      }
      {arbNoSpread() && <div className="m-0 mb-24">
          <div className="w-5/6 mx-auto flex justify-start">
            <h1 className="text-3xl font-bold pb-1 border-b-2 border-gray-200" id="arb-title">Games with an Arbitrage Opportunity but Spread Difference</h1>
          </div>
          <div className="w-5/6 mx-auto mt-2 flex flex-row justify-start items-center">
            <h3 className="text-3xl ml-2 mr-2 mb-1">see </h3>
            <a href="/about" className="flex justify-center" rel="noopener noreferrer" target="_blank">
              <button className="ml-1 mr-4 py-1 px-3 whitespace-nowrap bg-white hover:text-white hover:bg-black rounded-lg" id="home-button">
                <div className="flex flex-row">
                  <span className="mt-1">/about</span>
                  <img className="ml-2" src={logo} height="25" width="25" />
                </div>
              </button>
            </a>
            <h3 className="text-3xl mb-1">for more info</h3>
          </div>
          <div className="w-5/6 h-[450px] mx-auto flex overflow-x-auto overflow-y-hidden" id="hide-scrollbar">
            {odds.map((x) => {
              return arbNoSpreadMap(x) &&
                ArbNoSpreadCard(x, bankroll);
            })}
          </div>
        </div>
      }
      {noArbNoSpread() && <div className="m-0 mb-24">
          <div className="w-5/6 mx-auto flex justify-start mb-5">
            <h1 className="text-3xl font-bold pb-1 border-b-2 border-gray-200" id="arb-title">Games with No Arbitrage Opportunities</h1>
          </div>
          <div className="w-5/6 h-[450px] mx-auto flex overflow-x-auto overflow-y-hidden" id="hide-scrollbar">
            {odds.map((x) => {
              return noArbNoSpreadMap(x) &&
                NoArbCard(x, bankroll);
            })}
          </div>
        </div>
      }
    </div>
  )
}