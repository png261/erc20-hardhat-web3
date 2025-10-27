const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("\n🔍 KIỂM TRA TẤT CẢ CHỨC NĂNG CONTRACT\n");
  console.log("=".repeat(60));

  // Đọc địa chỉ contract
  const addressPath = path.join(__dirname, "../public/contract-address.json");
  let contractAddress;
  
  try {
    const addressData = JSON.parse(fs.readFileSync(addressPath, "utf8"));
    contractAddress = addressData.address;
    console.log("✅ Contract Address:", contractAddress);
  } catch (error) {
    console.log("❌ Không đọc được contract address:", error.message);
    return;
  }

  // Lấy contract
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const token = MyToken.attach(contractAddress);

  // Lấy accounts
  const [owner, alice, bob, charlie] = await hre.ethers.getSigners();

  console.log("\n📋 ACCOUNTS:");
  console.log("Owner  :", owner.address);
  console.log("Alice  :", alice.address);
  console.log("Bob    :", bob.address);
  console.log("Charlie:", charlie.address);

  try {
    // Test 1: Kiểm tra thông tin cơ bản
    console.log("\n" + "=".repeat(60));
    console.log("TEST 1: THÔNG TIN TOKEN");
    console.log("=".repeat(60));
    
    const name = await token.name();
    const symbol = await token.symbol();
    const decimals = await token.decimals();
    const totalSupply = await token.totalSupply();
    
    console.log("✅ Name         :", name);
    console.log("✅ Symbol       :", symbol);
    console.log("✅ Decimals     :", decimals.toString());
    console.log("✅ Total Supply :", (Number(totalSupply) / 1e18).toFixed(2), "MTK");

    // Test 2: Kiểm tra balanceOf
    console.log("\n" + "=".repeat(60));
    console.log("TEST 2: KIỂM TRA BALANCE");
    console.log("=".repeat(60));
    
    const ownerBalance = await token.balanceOf(owner.address);
    const aliceBalance = await token.balanceOf(alice.address);
    const bobBalance = await token.balanceOf(bob.address);
    
    console.log("✅ Owner balance :", (Number(ownerBalance) / 1e18).toFixed(2), "MTK");
    console.log("✅ Alice balance :", (Number(aliceBalance) / 1e18).toFixed(2), "MTK");
    console.log("✅ Bob balance   :", (Number(bobBalance) / 1e18).toFixed(2), "MTK");

    // Test 3: Transfer
    console.log("\n" + "=".repeat(60));
    console.log("TEST 3: TRANSFER");
    console.log("=".repeat(60));
    
    const transferAmount = BigInt(100e18);
    console.log("🔄 Chuyển 100 MTK từ Owner → Alice...");
    const tx1 = await token.transfer(alice.address, transferAmount);
    await tx1.wait();
    
    const newAliceBalance = await token.balanceOf(alice.address);
    console.log("✅ Alice balance sau transfer:", (Number(newAliceBalance) / 1e18).toFixed(2), "MTK");

    // Test 4: Approve
    console.log("\n" + "=".repeat(60));
    console.log("TEST 4: APPROVE");
    console.log("=".repeat(60));
    
    const approveAmount = BigInt(50e18);
    console.log("🔄 Alice approve Bob được dùng 50 MTK...");
    const tx2 = await token.connect(alice).approve(bob.address, approveAmount);
    await tx2.wait();
    
    const allowance = await token.allowance(alice.address, bob.address);
    console.log("✅ Bob allowance từ Alice:", (Number(allowance) / 1e18).toFixed(2), "MTK");

    // Test 5: TransferFrom
    console.log("\n" + "=".repeat(60));
    console.log("TEST 5: TRANSFER FROM");
    console.log("=".repeat(60));
    
    const transferFromAmount = BigInt(30e18);
    console.log("🔄 Bob chuyển 30 MTK từ Alice → Charlie...");
    
    const charlieBalanceBefore = await token.balanceOf(charlie.address);
    const tx3 = await token.connect(bob).transferFrom(alice.address, charlie.address, transferFromAmount);
    await tx3.wait();
    
    const charlieBalanceAfter = await token.balanceOf(charlie.address);
    const newAllowance = await token.allowance(alice.address, bob.address);
    
    console.log("✅ Charlie balance trước :", (Number(charlieBalanceBefore) / 1e18).toFixed(2), "MTK");
    console.log("✅ Charlie balance sau   :", (Number(charlieBalanceAfter) / 1e18).toFixed(2), "MTK");
    console.log("✅ Bob allowance còn lại :", (Number(newAllowance) / 1e18).toFixed(2), "MTK");

    // Test 6: Kiểm tra lại tất cả balances
    console.log("\n" + "=".repeat(60));
    console.log("TEST 6: FINAL BALANCES");
    console.log("=".repeat(60));
    
    const finalOwner = await token.balanceOf(owner.address);
    const finalAlice = await token.balanceOf(alice.address);
    const finalBob = await token.balanceOf(bob.address);
    const finalCharlie = await token.balanceOf(charlie.address);
    
    console.log("Owner  :", (Number(finalOwner) / 1e18).toFixed(2), "MTK");
    console.log("Alice  :", (Number(finalAlice) / 1e18).toFixed(2), "MTK");
    console.log("Bob    :", (Number(finalBob) / 1e18).toFixed(2), "MTK");
    console.log("Charlie:", (Number(finalCharlie) / 1e18).toFixed(2), "MTK");

    console.log("\n" + "=".repeat(60));
    console.log("✅✅✅ TẤT CẢ CÁC CHỨC NĂNG HOẠT ĐỘNG BÌNH THƯỜNG!");
    console.log("=".repeat(60));

  } catch (error) {
    console.log("\n" + "=".repeat(60));
    console.log("❌ LỖI KHI TEST:");
    console.log("=".repeat(60));
    console.log(error.message);
    console.log("\n❌ Contract có thể không tồn tại tại địa chỉ:", contractAddress);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
