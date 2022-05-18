const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("CTBPass");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("contract was deployed to:", nftContract.address);

  let txn = await nftContract.mintTheMFPass();
  await txn.wait();
  console.log("minted nft 1");
  txn = await nftContract.mintTheMFPass();
  await txn.wait("minted nft 2");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();