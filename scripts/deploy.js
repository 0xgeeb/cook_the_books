const main = async () => {
  const CTBPass = await hre.ethers.getContractFactory("CTBPass");
  const passContract = await CTBPass.deploy();
  await passContract.deployed();
  console.log("contract was deployed to:", passContract.address);
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