// Script để distribute tokens cho các test accounts
const hre = require("hardhat");

async function main() {
  console.log("\n🎁 Distributing tokens to test accounts...\n");

  // Get contract
  const contractAddressData = require("../public/contract-address.json");
  const contractAddress = contractAddressData.address;
  
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const token = MyToken.attach(contractAddress);

  // Get accounts
  const [owner, account1, account2, account3] = await hre.ethers.getSigners();

  console.log("Contract:", contractAddress);
  console.log("Owner:", owner.address);
  console.log("\n📤 Transferring tokens...\n");

  // Transfer tokens to test accounts - 10,000 MTK each
  const decimals = 18;
  const amount = BigInt(10000) * BigInt(10 ** decimals);

  // Transfer to Account #1
  console.log("Transferring 10,000 MTK to Account #1:", account1.address);
  let tx = await token.transfer(account1.address, amount);
  await tx.wait();
  console.log("✅ Done");

  // Transfer to Account #2
  console.log("Transferring 10,000 MTK to Account #2:", account2.address);
  tx = await token.transfer(account2.address, amount);
  await tx.wait();
  console.log("✅ Done");

  // Transfer to Account #3
  console.log("Transferring 10,000 MTK to Account #3:", account3.address);
  tx = await token.transfer(account3.address, amount);
  await tx.wait();
  console.log("✅ Done");

  console.log("\n📊 Final Balances:\n");

  // Check balances
  for (let i = 0; i < 4; i++) {
    const accounts = [owner, account1, account2, account3];
    const balance = await token.balanceOf(accounts[i].address);
    const formatted = Number(balance) / (10 ** decimals);
    console.log(`Account #${i}: ${accounts[i].address}`);
    console.log(`  Balance: ${formatted} MTK\n`);
  }

  console.log("✅ Token distribution complete!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
