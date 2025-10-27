const hre = require("hardhat");

async function main() {
  console.log("\n🔍 KIỂM TRA METAMASK CONNECTION\n");
  console.log("=".repeat(70));
  
  // 1. Kiểm tra Chain ID
  console.log("\n📍 BƯỚC 1: KIỂM TRA CHAIN ID");
  console.log("-".repeat(70));
  const network = await hre.ethers.provider.getNetwork();
  console.log("✅ Hardhat node Chain ID:", network.chainId);
  console.log("   → MetaMask PHẢI kết nối với Chain ID:", network.chainId);
  
  // 2. Kiểm tra Contract Address
  console.log("\n📍 BƯỚC 2: KIỂM TRA CONTRACT ADDRESS");
  console.log("-".repeat(70));
  const fs = require("fs");
  const path = require("path");
  const addressPath = path.join(__dirname, "../public/contract-address.json");
  const addressData = JSON.parse(fs.readFileSync(addressPath, "utf8"));
  console.log("✅ Contract Address:", addressData.address);
  
  // 3. Kiểm tra Contract có tồn tại
  console.log("\n📍 BƯỚC 3: KIỂM TRA CONTRACT TỒN TẠI");
  console.log("-".repeat(70));
  const code = await hre.ethers.provider.getCode(addressData.address);
  if (code === "0x") {
    console.log("❌ CONTRACT KHÔNG TỒN TẠI tại địa chỉ này!");
    console.log("   → Cần deploy lại contract");
  } else {
    console.log("✅ Contract tồn tại (", code.length, "bytes)");
  }
  
  // 4. Test gọi balanceOf từ node
  console.log("\n📍 BƯỚC 4: TEST GỌI balanceOf TỪ NODE");
  console.log("-".repeat(70));
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const token = MyToken.attach(addressData.address);
  
  const testAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  try {
    const balance = await token.balanceOf(testAddress);
    console.log("✅ balanceOf THÀNH CÔNG từ node");
    console.log("   Address:", testAddress);
    console.log("   Balance:", (Number(balance) / 1e18).toFixed(2), "MTK");
  } catch (error) {
    console.log("❌ LỖI khi gọi balanceOf:", error.message);
  }
  
  // 5. Hướng dẫn kiểm tra MetaMask
  console.log("\n📍 BƯỚC 5: KIỂM TRA METAMASK");
  console.log("-".repeat(70));
  console.log("\n🔍 MỞ METAMASK VÀ KIỂM TRA:");
  console.log("\n1️⃣  Network đang chọn:");
  console.log("   ✅ Phải hiển thị: 'Hardhat 6666' hoặc tên network của bạn");
  console.log("   ❌ KHÔNG được là: 'Localhost 8545', 'Hardhat Local'");
  
  console.log("\n2️⃣  Vào Settings → Networks → Chọn network đang dùng:");
  console.log("   ✅ Chain ID phải là:", network.chainId);
  console.log("   ✅ RPC URL phải là: http://127.0.0.1:8545");
  
  console.log("\n3️⃣  Account đang dùng:");
  console.log("   ✅ Phải có ETH (10,000 ETH)");
  console.log("   ✅ Address nên là:", testAddress);
  
  console.log("\n4️⃣  Trong Console của Browser (F12):");
  console.log("   Chạy lệnh này để kiểm tra Chain ID từ MetaMask:");
  console.log("   ");
  console.log("   await window.ethereum.request({ method: 'eth_chainId' })");
  console.log("   ");
  console.log("   ✅ Kết quả phải là:", "0x" + network.chainId.toString(16));
  console.log("      (", network.chainId, "trong decimal)");
  
  console.log("\n📍 BƯỚC 6: FRONTEND CONNECTION");
  console.log("-".repeat(70));
  console.log("Frontend đang chạy tại: http://localhost:3000");
  console.log("\n🔍 MỞ BROWSER CONSOLE (F12) và kiểm tra:");
  console.log("   1. Mở http://localhost:3000");
  console.log("   2. Nhấn F12 để mở Console");
  console.log("   3. Click 'Connect Wallet'");
  console.log("   4. Xem có lỗi gì trong Console không");
  
  console.log("\n" + "=".repeat(70));
  console.log("✅ TÓM TẮT THÔNG TIN:");
  console.log("=".repeat(70));
  console.log("Chain ID:         ", network.chainId, "(decimal) =", "0x" + network.chainId.toString(16), "(hex)");
  console.log("Contract Address: ", addressData.address);
  console.log("RPC URL:          ", "http://127.0.0.1:8545");
  console.log("Frontend:         ", "http://localhost:3000");
  console.log("Owner Address:    ", testAddress);
  console.log("=".repeat(70));
  
  console.log("\n💡 NẾU VẪN LỖI 'call revert exception':");
  console.log("   → MetaMask đang kết nối SAI Chain ID");
  console.log("   → Kiểm tra lại Chain ID trong MetaMask Settings");
  console.log("   → Phải xóa network cũ và thêm lại với Chain ID", network.chainId);
  console.log("");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
