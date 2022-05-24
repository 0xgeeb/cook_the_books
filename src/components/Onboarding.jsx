import React from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import MetaMaskLogo from ".././images/metamasklogo.png";
import AvaxLogo from ".././images/avax_logo.png";
import logo from ".././images/colored_logo.png";
import CTBPassABI from "../utils/CTBPass.json";
import { ethers } from "ethers";

// Avalanche Network information for automatic onboarding in MetaMask
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
}
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
}

const CONTRACT_ADDRESS = "0x8880Ee7EF20ccBdB2088e4aC85FBB6C652C3822f";
let loading = false;

// This code uses the Avalanche Test Network. If you want to use the main network, simply
// change this to AVALANCHE_MAINNET_PARAMS
const AVALANCHE_NETWORK_PARAMS = AVALANCHE_TESTNET_PARAMS

// Check if the chain id is the selected Avalanche chain id
const isAvalancheChain = (chainId) => (
  chainId &&
  chainId.toLowerCase() === AVALANCHE_NETWORK_PARAMS.chainId.toLowerCase()
)

export class OnboardingButton extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      accounts: [],
      chainId: null,
      onboarding: new MetaMaskOnboarding()
    }

    this.connectMetaMask = this.connectMetaMask.bind(this)
    this.switchToAvalancheChain = this.switchToAvalancheChain.bind(this)
  }

  componentDidMount () {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      this.connectMetaMask()

      // Update the list of accounts if the user switches accounts in MetaMask
      window.ethereum.on('accountsChanged', accounts => this.setState({ accounts }))

      // Reload the site if the user selects a different chain
      window.ethereum.on('chainChanged', () => window.location.reload())

      // Set the chain id once the MetaMask wallet is connected
      window.ethereum.on('connect', (connectInfo) => {
        const chainId = connectInfo.chainId
        this.setState({ chainId })
        if (isAvalancheChain(chainId)) {
          // The user is now connected to the MetaMask wallet and has the correct
          // Avalanche chain selected.
          // this.props.onConnected()
        }
      })
    }
  }

  connectMetaMask () {
    // Request to connect to the MetaMask wallet
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(accounts => this.setState({ accounts }))
  }

  switchToAvalancheChain () {
    // Request to switch to the selected Avalanche network
    window.ethereum
      .request({
        method: 'wallet_addEthereumChain',
        params: [AVALANCHE_TESTNET_PARAMS]
      })
  }

  async interactMintFunction () {
    loading = true;
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
    const mintTxn = await passContract.mintTheMFPass(overrides);
    await mintTxn.wait();
    console.log(mintTxn);
    loading = false;
  }

  render () {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (this.state.accounts.length > 0) {
        // If the user is connected to MetaMask, stop the onboarding process.
        this.state.onboarding.stopOnboarding()
      }
    }

    if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
      // If MetaMask is not yet installed, ask the user to start the MetaMask onboarding process
      // (install the MetaMask browser extension).
      return (
        <div className="flex flex-col justify-center">
          <div className="mx-auto">you will need to install MetaMask to mint the nft</div>
          <button className="mx-auto py-1 px-3 mt-8 whitespace-nowrap bg-white hover:text-white hover:bg-black rounded-lg" id="home-button" onClick={this.state.onboarding.startOnboarding}>
            <div className="flex flex-row items-center">
              <span>install metamask</span>
              <img className="ml-2" src={MetaMaskLogo} height="30" width="30" />
            </div>
          </button>
        </div>
      )
    } else if (this.state.accounts.length === 0) {
      // If accounts is empty the user is not yet connected to the MetaMask wallet.
      // Ask the user to connect to MetaMask.
      return (
        <div className="flex flex-col justify-center">
          <div className="mx-auto">connect your metamask wallet to the website plz</div>
          <button className="mx-auto py-1 px-3 mt-8 whitespace-nowrap bg-white hover:text-white hover:bg-black rounded-lg" id="home-button" onClick={this.connectMetaMask}>
            <div className="flex flex-row items-center">
              <span>connect wallet</span>
              <img className="ml-2" src={MetaMaskLogo} height="30" width="30" />
            </div>
          </button>
        </div>
      )
    } else if (!isAvalancheChain(this.state.chainId)) {
      // If the selected chain id is not the Avalanche chain id, ask the user to switch
      // to Avalanche.
      return (
        <div className="flex flex-col justify-center">
          <div className="mx-auto">plz hop on the Avalanche network</div>
          <button className="mx-auto py-1 px-3 mt-8 whitespace-nowrap bg-white hover:text-white hover:bg-black rounded-lg" id="home-button" onClick={this.switchToAvalancheChain}>
            <div className="flex flex-row items-center">
              <span>switch to red triangle</span>
              <img className="ml-2" src={AvaxLogo} height="60" width="60" />
            </div>
          </button>
        </div>
      )
    } else {
      // The user is connected to the MetaMask wallet and has the Avalanche chain selected.
      return <div className="flex flex-col justify-center" >
                <div className="mx-auto">placeholder for nft info possibly</div>
                <button className="mx-auto py-1 px-3 mt-8 whitespace-nowrap bg-white hover:text-white hover:bg-black rounded-lg" id="home-button" onClick={this.interactMintFunction}>
                  <div className="flex flex-row items-center">
                    <span className="">mint pass</span>
                    <img className="ml-2" src={logo} height="30" width="30" />
                  </div>
                </button>
                {loading && <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
              </div>
    }
  }
}