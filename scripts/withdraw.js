const main = async () => {
  const passMoney = contract.attach('0x8c9eA819aC469619F4acABa01F7F2270E8ABC5D1');
  console.log(passMoney);


  // let txn = await passContract.withdraw();
  // await txn.wait();
  // console.log('withdrew that shit');
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