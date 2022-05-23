const { expect } = require("chai");

describe("CTBPass", function () {
  it("deploy the contract", async function () {
    const passContractFactory = await hre.ethers.getContractFactory("CTBPass");
    const passContract = await passContractFactory.deploy();
    await passContract.deployed();
    let txn = await passContract.mintTheMFPass();
    await txn.wait();
    expect(await passContract.name()).to.equal("Cook the Books Pass - test2");
  });
  it("mint nft 1", async function () {
    expect(await passContract.mintTheMFPass(1)).to.emit(
      passContract,
      "NewPassMinted"
    );
  });
  // it("mint nft 2", async function () {
  //   txn = await passContract.mintTheMFPass();
  //   await txn.wait("minted nft 2");
  // });
  // it("mint nft 3", async function () {
  //   txn = await passContract.mintTheMFPass();
  //   await txn.wait("minted nft 3");
  // });
});