const { expect } = require("chai");

describe("CTBPass_svg", function () {
  it("should return the right name and test the gas fee", async function () {
    const nftContractFactory = await hre.ethers.getContractFactory("CTBPass");
    const nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
    let txn = await nftContract.mintTheMFPass();
    await txn.wait();
    console.log("minted nft 1");
    txn = await nftContract.mintTheMFPass();
    await txn.wait("minted nft 2");
    console.log("minted nft 2");
    txn = await nftContract.mintTheMFPass();
    await txn.wait("minted nft 3");
    console.log("minted nft 3");
    expect(await nftContract.name()).to.equal("Cook the Books Pass - test2");
  });
});