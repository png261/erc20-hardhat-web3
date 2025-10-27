const hre = require("hardhat");

async function main() {
  console.log("Bắt đầu deploy MyToken contract...");

  // Số lượng token ban đầu (1 triệu token)
  const initialSupply = 1000000;

  // Deploy contract
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(initialSupply);

  await myToken.waitForDeployment();

  const contractAddress = await myToken.getAddress();
  
  console.log(`MyToken deployed to: ${contractAddress}`);
  console.log(`Initial Supply: ${initialSupply} MTK`);
  
  // Lưu địa chỉ contract vào file để sử dụng trong frontend
  const fs = require("fs");
  const path = require("path");
  
  const contractData = {
    address: contractAddress,
    network: hre.network.name,
    deployedAt: new Date().toISOString()
  };
  
  // Tạo thư mục public nếu chưa có
  const publicDir = path.join(__dirname, "../public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Lưu contract address
  fs.writeFileSync(
    path.join(publicDir, "contract-address.json"),
    JSON.stringify(contractData, null, 2)
  );
  
  console.log("Contract address đã được lưu vào public/contract-address.json");
  
  // Copy ABI file vào public để frontend sử dụng
  const abiSource = path.join(__dirname, "../artifacts/contracts/MyToken.sol/MyToken.json");
  const abiDest = path.join(publicDir, "MyToken.json");
  
  fs.copyFileSync(abiSource, abiDest);
  console.log("Contract ABI đã được copy vào public/MyToken.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
