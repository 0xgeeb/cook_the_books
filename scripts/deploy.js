const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("CTBPass");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("contract was deployed to:", nftContract.address);

  // let txn = await nftContract.mintTheMFPass();
  // await txn.wait();
  // console.log("minted nft 1");
  // txn = await nftContract.mintTheMFPass();
  // await txn.wait("minted nft 2");
  // console.log("minted nft 2");
  // let overrides = {
  //   value: ethers.utils.parseEther((1).toString())
  // };
  // txn = await nftContract.mintTheMFPass(overrides);
  // await txn.wait("minted nft 3");
  // console.log("minted nft 3");
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