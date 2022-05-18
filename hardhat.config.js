require("@nomiclabs/hardhat-waffle");
require('dotenv').config({path: ".env"});

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    fuji: {
      url: process.env.FUJI_APIKEY,
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: [process.env.FUJI_PRIVATE_KEY]
    }
    // mainnet: {
    //   url: 'https://api.avax.network/ext/bc/C/rpc',
    //   gasPrice: 225000000000,
    //   chainId: 43114,
    //   accounts: [],
    // },
  }
};
