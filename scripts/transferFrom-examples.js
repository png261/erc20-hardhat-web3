const hre = require("hardhat");

async function main() {
  console.log("\n=== VÍ DỤ TRANSFERFROM ===\n");

  // Lấy danh sách accounts từ Hardhat
  const [owner, user1, user2, user3] = await hre.ethers.getSigners();

  console.log("📋 Các địa chỉ tham gia:");
  console.log("Owner (deployer):", owner.address);
  console.log("User1:", user1.address);
  console.log("User2:", user2.address);
  console.log("User3:", user3.address);

  // Load contract đã deploy
  const contractData = require("../public/contract-address.json");
  const contractAddress = contractData.address;
  
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const token = MyToken.attach(contractAddress);

  console.log("\n🪙 Contract Address:", contractAddress);

  // Kiểm tra số dư ban đầu
  async function checkBalances(label) {
    console.log(`\n💰 ${label}:`);
    const ownerBalance = await token.balanceOf(owner.address);
    const user1Balance = await token.balanceOf(user1.address);
    const user2Balance = await token.balanceOf(user2.address);
    const user3Balance = await token.balanceOf(user3.address);
    
    console.log(`  Owner: ${hre.ethers.formatUnits(ownerBalance, 18)} MTK`);
    console.log(`  User1: ${hre.ethers.formatUnits(user1Balance, 18)} MTK`);
    console.log(`  User2: ${hre.ethers.formatUnits(user2Balance, 18)} MTK`);
    console.log(`  User3: ${hre.ethers.formatUnits(user3Balance, 18)} MTK`);
  }

  await checkBalances("Số dư ban đầu");

  console.log("\n" + "=".repeat(70));
  console.log("VÍ DỤ 1: Owner approve cho User1, sau đó User1 transferFrom");
  console.log("=".repeat(70));

  // Owner chuyển một số token cho User1 trước
  console.log("\n1️⃣ Owner chuyển 1000 MTK cho User1...");
  let tx = await token.transfer(user1.address, hre.ethers.parseUnits("1000", 18));
  await tx.wait();
  console.log("   ✅ Chuyển thành công!");

  await checkBalances("Sau khi chuyển cho User1");

  // User1 approve cho User2 sử dụng 500 MTK
  console.log("\n2️⃣ User1 approve 500 MTK cho User2...");
  const tokenAsUser1 = token.connect(user1);
  tx = await tokenAsUser1.approve(user2.address, hre.ethers.parseUnits("500", 18));
  await tx.wait();
  console.log("   ✅ Approve thành công!");

  // Kiểm tra allowance
  const allowance = await token.allowance(user1.address, user2.address);
  console.log(`   📊 Allowance của User2 từ User1: ${hre.ethers.formatUnits(allowance, 18)} MTK`);

  // User2 sử dụng transferFrom để chuyển token từ User1 sang User3
  console.log("\n3️⃣ User2 dùng transferFrom để chuyển 300 MTK từ User1 → User3...");
  const tokenAsUser2 = token.connect(user2);
  tx = await tokenAsUser2.transferFrom(
    user1.address,
    user3.address,
    hre.ethers.parseUnits("300", 18)
  );
  await tx.wait();
  console.log("   ✅ TransferFrom thành công!");

  await checkBalances("Sau khi User2 transferFrom");

  // Kiểm tra allowance còn lại
  const remainingAllowance = await token.allowance(user1.address, user2.address);
  console.log(`\n📊 Allowance còn lại của User2 từ User1: ${hre.ethers.formatUnits(remainingAllowance, 18)} MTK`);

  console.log("\n" + "=".repeat(70));
  console.log("VÍ DỤ 2: User2 tiếp tục transferFrom với allowance còn lại");
  console.log("=".repeat(70));

  console.log("\n4️⃣ User2 chuyển tiếp 200 MTK từ User1 → User3...");
  tx = await tokenAsUser2.transferFrom(
    user1.address,
    user3.address,
    hre.ethers.parseUnits("200", 18)
  );
  await tx.wait();
  console.log("   ✅ TransferFrom thành công!");

  await checkBalances("Sau transferFrom lần 2");

  const finalAllowance = await token.allowance(user1.address, user2.address);
  console.log(`\n📊 Allowance cuối cùng: ${hre.ethers.formatUnits(finalAllowance, 18)} MTK`);

  console.log("\n" + "=".repeat(70));
  console.log("VÍ DỤ 3: Thử transferFrom vượt quá allowance (sẽ fail)");
  console.log("=".repeat(70));

  console.log("\n5️⃣ User2 thử chuyển 100 MTK từ User1 (nhưng chỉ còn 0 allowance)...");
  try {
    tx = await tokenAsUser2.transferFrom(
      user1.address,
      user3.address,
      hre.ethers.parseUnits("100", 18)
    );
    await tx.wait();
    console.log("   ⚠️ Không nên đến đây!");
  } catch (error) {
    console.log("   ❌ Lỗi như mong đợi: Insufficient allowance");
    console.log(`   📝 ${error.message.split('\n')[0]}`);
  }

  console.log("\n" + "=".repeat(70));
  console.log("VÍ DỤ 4: Approve không giới hạn (max uint256)");
  console.log("=".repeat(70));

  console.log("\n6️⃣ User1 approve không giới hạn cho User2...");
  tx = await tokenAsUser1.approve(user2.address, hre.ethers.MaxUint256);
  await tx.wait();
  console.log("   ✅ Approve unlimited thành công!");

  const unlimitedAllowance = await token.allowance(user1.address, user2.address);
  console.log(`   📊 Allowance: ${unlimitedAllowance.toString()} (Max uint256)`);

  console.log("\n7️⃣ User2 transferFrom 100 MTK từ User1 → Owner...");
  tx = await tokenAsUser2.transferFrom(
    user1.address,
    owner.address,
    hre.ethers.parseUnits("100", 18)
  );
  await tx.wait();
  console.log("   ✅ TransferFrom thành công!");

  await checkBalances("Số dư cuối cùng");

  console.log("\n" + "=".repeat(70));
  console.log("VÍ DỤ 5: Hủy approve (set về 0)");
  console.log("=".repeat(70));

  console.log("\n8️⃣ User1 hủy approve cho User2 (set về 0)...");
  tx = await tokenAsUser1.approve(user2.address, 0);
  await tx.wait();
  console.log("   ✅ Đã hủy approve!");

  const zeroAllowance = await token.allowance(user1.address, user2.address);
  console.log(`   📊 Allowance hiện tại: ${hre.ethers.formatUnits(zeroAllowance, 18)} MTK`);

  console.log("\n✨ HOÀN THÀNH TẤT CẢ VÍ DỤ! ✨\n");

  // Tổng kết
  console.log("📚 TÓM TẮT:");
  console.log("1. Approve cho phép địa chỉ khác sử dụng token của bạn");
  console.log("2. TransferFrom cho phép chuyển token từ address đã approve");
  console.log("3. Allowance giảm sau mỗi lần transferFrom");
  console.log("4. Có thể approve không giới hạn với MaxUint256");
  console.log("5. Có thể hủy approve bằng cách set về 0");
  console.log("6. Không thể transferFrom vượt quá allowance");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
