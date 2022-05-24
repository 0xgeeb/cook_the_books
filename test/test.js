const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("CTBPass", async () => {

  let pass;
  let passContractAddress;
  let tokenId;

  beforeEach('deploy contract', async() => {
    const CTBPass = await ethers.getContractFactory("CTBPass");
    pass = await CTBPass.deploy();
    await pass.deployed();
    passContractAddress = pass.address;
  });

  it('should have an address', async () => {
    assert.notEqual(passContractAddress, 0x0);
		assert.notEqual(passContractAddress, '');
		assert.notEqual(passContractAddress, null);
		assert.notEqual(passContractAddress, undefined);
  });

  it('should have a name', async () => {
    const name = await pass.name();
    assert.equal(name, 'Cook the Books Pass - test3');
  });

	it('should be able to mint NFTs', async () => {

		let txn = await pass.mintTheMFPass()
		let tx = await txn.wait()
		let event = tx.events[0]
		let value = event.args[2]
		tokenId = value.toNumber()
		assert.equal(tokenId, 1)

		txn = await pass.mintTheMFPass()
		tx = await txn.wait()
		event = tx.events[0]
		value = event.args[2]
		tokenId = value.toNumber()
		assert.equal(tokenId, 2)

    let overrides = {
      value: ethers.utils.parseEther((1).toString())
    };

    txn = await pass.mintTheMFPass(overrides)
		tx = await txn.wait()
		event = tx.events[0]
		value = event.args[2]
		tokenId = value.toNumber()
		assert.equal(tokenId, 3)
	})


});