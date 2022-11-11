const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const transactionsFactory = await hre.ethers.getContractFactory("Transactions");
    const transactionsContract = await transactionsFactory.deploy({
      value: hre.ethers.utils.parseEther("0.1"),
    });

    await transactionsContract.deployed();
    console.log("Contract add:", transactionsContract.address);
  
    /*
     * Get Contract balance
     */
    let senderBalance = await hre.ethers.provider.getBalance(
      owner.address
    );
    console.log(
      "Sender balance:",
      hre.ethers.utils.formatEther(senderBalance)
    );
  
    /*
     * Make a transfer transaction
     */
    const receiver = "0xE9432ee6F9Ea900d167c84551d7712E9Bdb5c578";
    const amount = hre.ethers.utils.parseEther("0.1");
    const message = "Congratulations!!! You have received 0.1 ETH.";
    const keyword = "TFR";

    const transactionTxn = await transactionsContract.setTransfer(receiver, amount, message, keyword);
    await transactionTxn.wait();
  
    /*
     * Get Contract balance to see what happened!
     */
    let receiverBalance = await hre.ethers.provider.getBalance(
      receiver
    );
    console.log(
      "Receiver balance:",
      hre.ethers.utils.formatEther(receiverBalance)
    );
  
    const transactions = await transactionsContract.getAllTransactions();
    console.log("Transactions:", transactions);

    const count = await transactionsContract.getTransactionCount();
    console.log("Transaction count:", count);
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