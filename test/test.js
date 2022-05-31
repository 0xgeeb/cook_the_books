const { assert } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("CTBPass", async () => {

  let pass;
  let passContractAddress;
  let tokenId;

  beforeEach('deploy contract', async() => {
    const CTBPass = await ethers.getContractFactory("CTBPass")
    pass = await CTBPass.deploy()
    await pass.deployed()
    passContractAddress = pass.address
  });

  it('should have an address', async () => {
    assert.notEqual(passContractAddress, 0x0)
		assert.notEqual(passContractAddress, '')
		assert.notEqual(passContractAddress, null)
		assert.notEqual(passContractAddress, undefined)
  });

  it('should have a name', async () => {
    const name = await pass.name()
    assert.equal(name, 'Cook the Books Pass')
  });

	it('should be able to mint 2 og passes', async () => {
		let txn = await pass.mintThePass()
		let tx = await txn.wait()
		let event = tx.events[0]
		let value = event.args[2]
		tokenId = value.toNumber()
		assert.equal(tokenId, 1)

		txn = await pass.mintThePass()
		tx = await txn.wait()
		event = tx.events[0]
		value = event.args[2]
		tokenId = value.toNumber()
		assert.equal(tokenId, 2)
	});

	it('should be able to pay for a regular pass', async () => {
		let txn = await pass.mintThePass()
		let tx = await txn.wait()
		let event = tx.events[0]
		let value = event.args[2]
		tokenId = value.toNumber()
		assert.equal(tokenId, 1)

		txn = await pass.mintThePass()
		tx = await txn.wait()
		event = tx.events[0]
		value = event.args[2]
		tokenId = value.toNumber()
		assert.equal(tokenId, 2)

		let overrides = {
			value: ethers.utils.parseEther((1).toString())
    };
		
    txn = await pass.mintThePass(overrides)
		tx = await txn.wait()
		event = tx.events[0]
		value = event.args[2]
		tokenId = value.toNumber()
		assert.equal(tokenId, 3)
	});

	it('should be able to view membership status', async () => {
		let txn = await pass.checkMembershipStatus()
		assert.equal(txn, 2 || 1)
	});

	it('should be able to withdraw balance', async () => {
		let txn = await pass.mintThePass()
		let tx = await txn.wait()
		let event = tx.events[0]
		let value = event.args[2]
		tokenId = value.toNumber()
		assert.equal(tokenId, 1)

		txn = await pass.mintThePass()
		tx = await txn.wait()
		event = tx.events[0]
		value = event.args[2]
		tokenId = value.toNumber()
		assert.equal(tokenId, 2)

		let overrides = {
			value: ethers.utils.parseEther((1).toString())
    };
		
    txn = await pass.mintThePass(overrides)
		tx = await txn.wait()
		event = tx.events[0]
		value = event.args[2]
		tokenId = value.toNumber()
		let txnx = await pass.withdraw()
		const provider = waffle.provider;
		const balance = await provider.getBalance(pass.address);
		assert.equal(balance, 0)
	});

	it('should be able to check current token id', async () => {
		let txn = await pass.mintThePass()
		let tx = await txn.wait()
		let event = tx.events[0]
		let value = event.args[2]
		tokenId = value.toNumber()

		txn = await pass.mintThePass()
		tx = await txn.wait()
		event = tx.events[0]
		value = event.args[2]
		tokenId = value.toNumber()
		let tokenTxn = await pass.checkTokenId()
		assert.equal(tokenTxn.toNumber()-1, tokenId)
	});
});