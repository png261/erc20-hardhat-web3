// Verify contract is deployed and working
const hre = require("hardhat");

async function main() {
  console.log("\n🔍 Verifying Contract Deployment...\n");

  const contractAddressData = require("../public/contract-address.json");
  const contractAddress = contractAddressData.address;
  
  console.log("Contract Address:", contractAddress);

  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const token = MyToken.attach(contractAddress);

  const [owner] = await hre.ethers.getSigners();
  
  try {
    // Test basic calls
    const name = await token.name();
    console.log("✅ Token Name:", name);

    const symbol = await token.symbol();
    console.log("✅ Token Symbol:", symbol);

    const decimals = await token.decimals();
    console.log("✅ Decimals:", decimals.toString());

    const totalSupply = await token.totalSupply();
    console.log("✅ Total Supply:", (Number(totalSupply) / 10**18).toLocaleString(), "MTK");

    const ownerBalance = await token.balanceOf(owner.address);
    console.log("✅ Owner Balance:", (Number(ownerBalance) / 10**18).toLocaleString(), "MTK");

    console.log("\n✅ CONTRACT IS WORKING CORRECTLY!\n");
    
    // Show owner address
    console.log("Owner Address:", owner.address);
    console.log("\nℹ️  Use this address to connect in MetaMask\n");

  } catch (error) {
    console.error("\n❌ CONTRACT VERIFICATION FAILED!");
    console.error("Error:", error.message);
    console.error("\nThis means the contract is NOT deployed at this address.");
    console.error("Solution: Run './reset-and-setup.sh' to redeploy\n");
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
