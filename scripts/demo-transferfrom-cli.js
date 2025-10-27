// Demo TransferFrom Examples - CLI Version với Output Đẹp
const hre = require("hardhat");

async function main() {
  console.log("\n" + "=".repeat(70));
  console.log("🎬 DEMO: TRANSFERFROM EXAMPLES");
  console.log("=".repeat(70) + "\n");

  // Get contract
  const contractAddressData = require("../public/contract-address.json");
  const contractAddress = contractAddressData.address;
  
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const token = MyToken.attach(contractAddress);

  // Get accounts
  const [owner, alice, bob, charlie] = await hre.ethers.getSigners();

  console.log("📋 SETUP:");
  console.log("─".repeat(70));
  console.log(`Contract Address: ${contractAddress}`);
  console.log(`Owner (Deployer):  ${owner.address}`);
  console.log(`Alice (Spender):   ${alice.address}`);
  console.log(`Bob (Recipient):   ${bob.address}`);
  console.log(`Charlie (User):    ${charlie.address}`);
  console.log("");

  const decimals = 18;

  // Helper function to format balance
  const formatBalance = (balance) => {
    return (Number(balance) / 10**decimals).toLocaleString();
  };

  // Helper to print balances
  const printBalances = async (title) => {
    console.log(`\n📊 ${title}`);
    console.log("─".repeat(70));
    const ownerBal = await token.balanceOf(owner.address);
    const aliceBal = await token.balanceOf(alice.address);
    const bobBal = await token.balanceOf(bob.address);
    const charlieBal = await token.balanceOf(charlie.address);
    
    console.log(`Owner:   ${formatBalance(ownerBal).padStart(12)} MTK`);
    console.log(`Alice:   ${formatBalance(aliceBal).padStart(12)} MTK`);
    console.log(`Bob:     ${formatBalance(bobBal).padStart(12)} MTK`);
    console.log(`Charlie: ${formatBalance(charlieBal).padStart(12)} MTK`);
  };

  await printBalances("INITIAL BALANCES");

  console.log("\n" + "=".repeat(70));
  console.log("EXAMPLE 1: Basic TransferFrom");
  console.log("=".repeat(70));
  console.log("Scenario: Owner approves Alice to spend 1,000 MTK");
  console.log("          Alice transfers 500 MTK from Owner to Bob");
  console.log("");

  // Step 1: Owner approves Alice
  console.log("Step 1: Owner approves Alice for 1,000 MTK");
  const approveAmount1 = BigInt(1000) * BigInt(10**decimals);
  let tx = await token.connect(owner).approve(alice.address, approveAmount1);
  await tx.wait();
  console.log("✅ Approved!");
  
  let allowance = await token.allowance(owner.address, alice.address);
  console.log(`   Allowance: ${formatBalance(allowance)} MTK\n`);

  // Step 2: Alice transfers from Owner to Bob
  console.log("Step 2: Alice calls transferFrom()");
  const transferAmount1 = BigInt(500) * BigInt(10**decimals);
  tx = await token.connect(alice).transferFrom(owner.address, bob.address, transferAmount1);
  await tx.wait();
  console.log("✅ TransferFrom successful!");
  console.log(`   Transferred: 500 MTK`);
  console.log(`   From: Owner → To: Bob`);
  console.log(`   Executed by: Alice\n`);

  // Check remaining allowance
  allowance = await token.allowance(owner.address, alice.address);
  console.log(`   Remaining Allowance: ${formatBalance(allowance)} MTK`);

  await printBalances("BALANCES AFTER EXAMPLE 1");

  console.log("\n" + "=".repeat(70));
  console.log("EXAMPLE 2: Multiple TransferFrom");
  console.log("=".repeat(70));
  console.log("Scenario: Alice transfers 300 more MTK from Owner to Charlie");
  console.log("");

  console.log("Step 1: Alice transfers 300 MTK to Charlie");
  const transferAmount2 = BigInt(300) * BigInt(10**decimals);
  tx = await token.connect(alice).transferFrom(owner.address, charlie.address, transferAmount2);
  await tx.wait();
  console.log("✅ TransferFrom successful!");
  console.log(`   Transferred: 300 MTK`);
  console.log(`   From: Owner → To: Charlie`);
  console.log(`   Executed by: Alice\n`);

  allowance = await token.allowance(owner.address, alice.address);
  console.log(`   Remaining Allowance: ${formatBalance(allowance)} MTK`);

  await printBalances("BALANCES AFTER EXAMPLE 2");

  console.log("\n" + "=".repeat(70));
  console.log("EXAMPLE 3: Try to Transfer More Than Allowance (Will Fail)");
  console.log("=".repeat(70));
  console.log("Scenario: Alice tries to transfer 300 MTK (only has 200 allowance left)");
  console.log("");

  try {
    console.log("Step 1: Alice attempts to transfer 300 MTK...");
    const transferAmount3 = BigInt(300) * BigInt(10**decimals);
    tx = await token.connect(alice).transferFrom(owner.address, bob.address, transferAmount3);
    await tx.wait();
    console.log("❌ This shouldn't happen!");
  } catch (error) {
    console.log("❌ Transaction REVERTED (as expected)");
    console.log(`   Error: ${error.message.split('\n')[0]}`);
    console.log(`   Reason: Insufficient allowance (need 300, have ${formatBalance(allowance)})`);
  }

  console.log("\n" + "=".repeat(70));
  console.log("EXAMPLE 4: Approve More and Continue");
  console.log("=".repeat(70));
  console.log("Scenario: Owner approves Alice for 500 more MTK");
  console.log("");

  console.log("Step 1: Owner approves additional 500 MTK");
  const approveAmount2 = BigInt(500) * BigInt(10**decimals);
  tx = await token.connect(owner).approve(alice.address, approveAmount2);
  await tx.wait();
  console.log("✅ Approved!");

  allowance = await token.allowance(owner.address, alice.address);
  console.log(`   New Allowance: ${formatBalance(allowance)} MTK\n`);

  console.log("Step 2: Alice transfers 400 MTK to Bob");
  const transferAmount4 = BigInt(400) * BigInt(10**decimals);
  tx = await token.connect(alice).transferFrom(owner.address, bob.address, transferAmount4);
  await tx.wait();
  console.log("✅ TransferFrom successful!");
  console.log(`   Transferred: 400 MTK`);

  allowance = await token.allowance(owner.address, alice.address);
  console.log(`   Remaining Allowance: ${formatBalance(allowance)} MTK`);

  await printBalances("BALANCES AFTER EXAMPLE 4");

  console.log("\n" + "=".repeat(70));
  console.log("EXAMPLE 5: Revoke Allowance");
  console.log("=".repeat(70));
  console.log("Scenario: Owner revokes Alice's allowance (set to 0)");
  console.log("");

  console.log("Step 1: Owner sets allowance to 0");
  tx = await token.connect(owner).approve(alice.address, 0);
  await tx.wait();
  console.log("✅ Allowance revoked!");

  allowance = await token.allowance(owner.address, alice.address);
  console.log(`   Current Allowance: ${formatBalance(allowance)} MTK\n`);

  console.log("Step 2: Alice tries to transfer (will fail)");
  try {
    const transferAmount5 = BigInt(100) * BigInt(10**decimals);
    tx = await token.connect(alice).transferFrom(owner.address, bob.address, transferAmount5);
    await tx.wait();
    console.log("❌ This shouldn't happen!");
  } catch (error) {
    console.log("❌ Transaction REVERTED (as expected)");
    console.log(`   Reason: No allowance (allowance = 0)`);
  }

  console.log("\n" + "=".repeat(70));
  console.log("EXAMPLE 6: Unlimited Allowance");
  console.log("=".repeat(70));
  console.log("Scenario: Owner approves Alice for MAX_UINT256 (unlimited)");
  console.log("");

  console.log("Step 1: Owner approves unlimited allowance");
  const maxUint256 = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
  tx = await token.connect(owner).approve(alice.address, maxUint256);
  await tx.wait();
  console.log("✅ Unlimited allowance approved!");

  allowance = await token.allowance(owner.address, alice.address);
  console.log(`   Allowance: ${allowance.toString()} (MAX_UINT256)\n`);

  console.log("Step 2: Alice transfers 1,000 MTK");
  const transferAmount6 = BigInt(1000) * BigInt(10**decimals);
  tx = await token.connect(alice).transferFrom(owner.address, charlie.address, transferAmount6);
  await tx.wait();
  console.log("✅ TransferFrom successful!");
  console.log(`   Transferred: 1,000 MTK`);

  allowance = await token.allowance(owner.address, alice.address);
  console.log(`   Remaining Allowance: ${allowance.toString()} (still MAX)\n`);

  console.log("💡 Note: With unlimited allowance, the allowance never decreases!");

  await printBalances("FINAL BALANCES");

  // Summary
  console.log("\n" + "=".repeat(70));
  console.log("📈 SUMMARY OF TRANSFERS");
  console.log("=".repeat(70));
  console.log("Total Transfers:");
  console.log("  • Owner → Bob:     900 MTK (via Alice)");
  console.log("  • Owner → Charlie: 1,300 MTK (via Alice)");
  console.log("  • Total moved:     2,200 MTK");
  console.log("");
  console.log("Key Learnings:");
  console.log("  ✅ TransferFrom requires prior approval");
  console.log("  ✅ Allowance decreases with each transfer");
  console.log("  ✅ Cannot transfer more than allowance");
  console.log("  ✅ Owner can revoke allowance anytime");
  console.log("  ✅ MAX_UINT256 = unlimited allowance");
  console.log("=".repeat(70) + "\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
