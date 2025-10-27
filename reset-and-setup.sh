#!/bin/bash

# 🚀 Reset và Setup Lại Blockchain Demo
# Script tự động reset toàn bộ và setup lại từ đầu

echo "🔄 ===== RESET BLOCKCHAIN DEMO ====="
echo ""

# 1. Dừng tất cả processes (nếu có)
echo "📍 Step 1: Killing existing processes..."
pkill -f "hardhat node" 2>/dev/null
pkill -f "react-scripts" 2>/dev/null
sleep 2
echo "✅ Processes stopped"
echo ""

# 2. Xóa cache
echo "📍 Step 2: Cleaning Hardhat cache..."
rm -rf artifacts/ cache/
echo "✅ Cache cleaned"
echo ""

# 3. Compile
echo "📍 Step 3: Compiling contracts..."
npx hardhat compile
if [ $? -ne 0 ]; then
    echo "❌ Compilation failed!"
    exit 1
fi
echo "✅ Compilation successful"
echo ""

# 4. Start Hardhat node in background
echo "📍 Step 4: Starting Hardhat node..."
npx hardhat node > hardhat-node.log 2>&1 &
HARDHAT_PID=$!
echo "✅ Hardhat node started (PID: $HARDHAT_PID)"
echo "   Log file: hardhat-node.log"
echo ""

# Đợi Hardhat node khởi động
echo "⏳ Waiting for Hardhat node to start..."
sleep 5

# 5. Deploy contract
echo "📍 Step 5: Deploying contract..."
npx hardhat run scripts/deploy.js --network localhost
if [ $? -ne 0 ]; then
    echo "❌ Deployment failed!"
    kill $HARDHAT_PID
    exit 1
fi
echo "✅ Contract deployed"
echo ""

# 5.5. Distribute tokens to test accounts
echo "📍 Step 5.5: Distributing tokens to test accounts..."
npx hardhat run scripts/distribute-tokens.js --network localhost
if [ $? -ne 0 ]; then
    echo "⚠️  Token distribution failed (not critical)"
else
    echo "✅ Tokens distributed"
fi
echo ""

# 6. Copy artifacts to React
echo "📍 Step 6: Copying artifacts to React app..."
cp public/contract-address.json frontend/src/
cp public/MyToken.json frontend/src/
echo "✅ Artifacts copied"
echo ""

# 7. Show contract info
echo "📍 Step 7: Contract Information"
echo "================================"
CONTRACT_ADDRESS=$(cat public/contract-address.json | grep -o '"address":"[^"]*' | cut -d'"' -f4)
echo "Contract Address: $CONTRACT_ADDRESS"
echo ""

# 8. Show Hardhat accounts (first 3)
echo "📍 Step 8: Hardhat Accounts"
echo "==========================="
echo "Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
echo "Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
echo ""
echo "Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
echo "Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
echo ""
echo "Account #2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
echo "Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a"
echo ""

echo "🎉 ===== SETUP COMPLETE ====="
echo ""
echo "📋 Next Steps:"
echo "1. Reset accounts in MetaMask:"
echo "   Settings → Advanced → Clear activity tab data"
echo "   Settings → Advanced → Reset Account (for each account)"
echo ""
echo "2. Start React app in NEW TERMINAL:"
echo "   cd frontend && npm start"
echo ""
echo "3. Open browser:"
echo "   http://localhost:3000"
echo ""
echo "4. Connect MetaMask and start testing!"
echo ""
echo "📊 Hardhat Node Logs:"
echo "   tail -f hardhat-node.log"
echo ""
echo "🛑 To stop Hardhat node:"
echo "   kill $HARDHAT_PID"
echo "   or: pkill -f 'hardhat node'"
echo ""
