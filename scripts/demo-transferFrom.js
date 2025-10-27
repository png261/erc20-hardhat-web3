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

  // Deploy contract mới
  console.log("\n🚀 Deploying contract...");
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy(1000000); // 1 triệu token
  await token.waitForDeployment();
  
  const contractAddress = await token.getAddress();
  console.log("🪙 Contract Address:", contractAddress);

  // Hàm helper để kiểm tra số dư
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
  console.log("VÍ DỤ 1: Owner chuyển token cho User1, User1 approve cho User2");
  console.log("=".repeat(70));

  // Owner chuyển 1000 token cho User1
  console.log("\n1️⃣ Owner chuyển 1000 MTK cho User1...");
  let tx = await token.transfer(user1.address, hre.ethers.parseUnits("1000", 18));
  await tx.wait();
  console.log("   ✅ Chuyển thành công!");

  await checkBalances("Sau khi Owner chuyển cho User1");

  // User1 approve 500 MTK cho User2
  console.log("\n2️⃣ User1 approve 500 MTK cho User2...");
  const tokenAsUser1 = token.connect(user1);
  tx = await tokenAsUser1.approve(user2.address, hre.ethers.parseUnits("500", 18));
  await tx.wait();
  console.log("   ✅ Approve thành công!");

  // Kiểm tra allowance
  let allowance = await token.allowance(user1.address, user2.address);
  console.log(`   📊 Allowance của User2 từ User1: ${hre.ethers.formatUnits(allowance, 18)} MTK`);

  console.log("\n" + "=".repeat(70));
  console.log("VÍ DỤ 2: User2 dùng transferFrom để chuyển token từ User1 → User3");
  console.log("=".repeat(70));

  // User2 transferFrom: chuyển 300 MTK từ User1 sang User3
  console.log("\n3️⃣ User2 dùng transferFrom để chuyển 300 MTK từ User1 → User3...");
  const tokenAsUser2 = token.connect(user2);
  tx = await tokenAsUser2.transferFrom(
    user1.address,
    user3.address,
    hre.ethers.parseUnits("300", 18)
  );
  await tx.wait();
  console.log("   ✅ TransferFrom thành công!");

  await checkBalances("Sau transferFrom lần 1");

  // Kiểm tra allowance còn lại
  allowance = await token.allowance(user1.address, user2.address);
  console.log(`   📊 Allowance còn lại: ${hre.ethers.formatUnits(allowance, 18)} MTK (500 - 300 = 200)`);

  console.log("\n" + "=".repeat(70));
  console.log("VÍ DỤ 3: User2 tiếp tục transferFrom với allowance còn lại");
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

  allowance = await token.allowance(user1.address, user2.address);
  console.log(`   📊 Allowance cuối: ${hre.ethers.formatUnits(allowance, 18)} MTK (đã hết)`);

  console.log("\n" + "=".repeat(70));
  console.log("VÍ DỤ 4: Thử transferFrom khi hết allowance (sẽ fail)");
  console.log("=".repeat(70));

  console.log("\n5️⃣ User2 thử chuyển 100 MTK từ User1 (nhưng đã hết allowance)...");
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
    console.log(`   📝 Error: ${error.message.split('(')[0].trim()}`);
  }

  console.log("\n" + "=".repeat(70));
  console.log("VÍ DỤ 5: Approve không giới hạn (MaxUint256)");
  console.log("=".repeat(70));

  // Owner chuyển thêm cho User1
  console.log("\n6️⃣ Owner chuyển thêm 500 MTK cho User1...");
  tx = await token.transfer(user1.address, hre.ethers.parseUnits("500", 18));
  await tx.wait();
  console.log("   ✅ Chuyển thành công!");

  console.log("\n7️⃣ User1 approve UNLIMITED cho User2...");
  tx = await tokenAsUser1.approve(user2.address, hre.ethers.MaxUint256);
  await tx.wait();
  console.log("   ✅ Approve unlimited thành công!");

  allowance = await token.allowance(user1.address, user2.address);
  console.log(`   📊 Allowance: ${allowance.toString()} (Max uint256 = unlimited)`);

  console.log("\n8️⃣ User2 transferFrom 200 MTK từ User1 → Owner...");
  tx = await tokenAsUser2.transferFrom(
    user1.address,
    owner.address,
    hre.ethers.parseUnits("200", 18)
  );
  await tx.wait();
  console.log("   ✅ TransferFrom thành công!");

  await checkBalances("Sau khi transferFrom với unlimited approval");

  console.log("\n" + "=".repeat(70));
  console.log("VÍ DỤ 6: Hủy approve (set về 0)");
  console.log("=".repeat(70));

  console.log("\n9️⃣ User1 hủy approve cho User2 (set về 0)...");
  tx = await tokenAsUser1.approve(user2.address, 0);
  await tx.wait();
  console.log("   ✅ Đã hủy approve!");

  allowance = await token.allowance(user1.address, user2.address);
  console.log(`   📊 Allowance hiện tại: ${hre.ethers.formatUnits(allowance, 18)} MTK`);

  console.log("\n🔟 User2 thử transferFrom sau khi bị hủy approve...");
  try {
    tx = await tokenAsUser2.transferFrom(
      user1.address,
      user3.address,
      hre.ethers.parseUnits("10", 18)
    );
    await tx.wait();
    console.log("   ⚠️ Không nên đến đây!");
  } catch (error) {
    console.log("   ❌ Lỗi như mong đợi: Không còn allowance");
    console.log(`   📝 Error: ${error.message.split('(')[0].trim()}`);
  }

  await checkBalances("Số dư cuối cùng");

  console.log("\n" + "=".repeat(70));
  console.log("✨ HOÀN THÀNH TẤT CẢ VÍ DỤ! ✨");
  console.log("=".repeat(70));

  console.log("\n📚 TÓM TẮT CÁC KHÁI NIỆM:");
  console.log("━".repeat(70));
  console.log("1️⃣  APPROVE: Cho phép địa chỉ khác sử dụng token của bạn");
  console.log("2️⃣  TRANSFERFROM: Chuyển token từ address đã approve cho bạn");
  console.log("3️⃣  ALLOWANCE: Số lượng token được phép sử dụng, giảm sau mỗi transferFrom");
  console.log("4️⃣  UNLIMITED: Có thể approve MaxUint256 để không giới hạn");
  console.log("5️⃣  REVOKE: Hủy approve bằng cách set về 0");
  console.log("6️⃣  SECURITY: Không thể transferFrom vượt quá allowance");
  console.log("━".repeat(70));
  
  console.log("\n💡 USE CASES:");
  console.log("• DEX (Uniswap, PancakeSwap): Approve để contract swap token");
  console.log("• Lending (Aave, Compound): Approve để contract quản lý token");
  console.log("• NFT Marketplace: Approve để contract bán NFT thay bạn");
  console.log("• Multi-sig Wallet: Approve cho các signer khác");
  console.log("");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
