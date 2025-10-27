#!/bin/bash

echo "🚀 AUTO SETUP & START"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if Hardhat node is running
if lsof -Pi :8545 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Hardhat node đang chạy"
else
    echo "⚠️  Hardhat node chưa chạy"
    echo "🔄 Đang khởi động Hardhat node..."
    npx hardhat node > /dev/null 2>&1 &
    sleep 3
    echo "✅ Hardhat node đã khởi động"
fi

# Check Chain ID
echo ""
echo "🔍 Kiểm tra Chain ID..."
CHAIN_ID=$(curl -s -X POST http://127.0.0.1:8545 \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}' \
  | grep -o '"result":"[^"]*"' \
  | cut -d'"' -f4)

if [ "$CHAIN_ID" = "0x1a0a" ]; then
    echo "✅ Chain ID: 6666 (0x1a0a) - ĐÚNG!"
else
    DECIMAL=$((16#${CHAIN_ID#0x}))
    echo "❌ Chain ID: $DECIMAL ($CHAIN_ID) - SAI!"
    echo "   Cần: 6666 (0x1a0a)"
    echo ""
    echo "🔧 Vui lòng:"
    echo "   1. Stop Hardhat node (Ctrl+C)"
    echo "   2. Kiểm tra hardhat.config.js có Chain ID 6666"
    echo "   3. Chạy lại script này"
    exit 1
fi

# Check contract deployment
echo ""
echo "🔍 Kiểm tra contract..."
if [ -f "public/contract-address.json" ]; then
    CONTRACT_ADDRESS=$(grep -o '"address":"[^"]*"' public/contract-address.json | cut -d'"' -f4)
    echo "✅ Contract address: $CONTRACT_ADDRESS"
    
    # Check if contract exists on blockchain
    CODE=$(curl -s -X POST http://127.0.0.1:8545 \
      -H "Content-Type: application/json" \
      --data "{\"jsonrpc\":\"2.0\",\"method\":\"eth_getCode\",\"params\":[\"$CONTRACT_ADDRESS\", \"latest\"],\"id\":1}" \
      | grep -o '"result":"[^"]*"' \
      | cut -d'"' -f4)
    
    if [ "$CODE" = "0x" ]; then
        echo "❌ Contract chưa được deploy!"
        echo "🔄 Đang deploy contract..."
        npx hardhat run scripts/deploy.js --network localhost
        npx hardhat run scripts/distribute-tokens.js --network localhost
    else
        echo "✅ Contract đã tồn tại trên blockchain"
    fi
else
    echo "❌ Contract chưa được deploy!"
    echo "🔄 Đang deploy contract..."
    npx hardhat run scripts/deploy.js --network localhost
    npx hardhat run scripts/distribute-tokens.js --network localhost
fi

# Copy artifacts to frontend
echo ""
echo "📦 Copy artifacts vào frontend..."
mkdir -p frontend/src
cp public/contract-address.json frontend/src/
cp public/MyToken.json frontend/src/
echo "✅ Đã copy artifacts"

# Check if frontend is running
echo ""
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Frontend đang chạy tại http://localhost:3000"
else
    echo "🔄 Đang khởi động frontend..."
    cd frontend && npm start &
    sleep 5
    echo "✅ Frontend đã khởi động tại http://localhost:3000"
fi

# Display summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ TẤT CẢ ĐÃ SẴN SÀNG!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Mở browser: http://localhost:3000"
echo ""
echo "📱 SETUP METAMASK:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Khi mở trang web, nếu thấy cảnh báo Chain ID:"
echo ""
echo "   🔄 Click nút 'Tự động chuyển sang Chain ID 6666'"
echo ""
echo "   → MetaMask sẽ tự động:"
echo "      1. Thêm network mới (nếu chưa có)"
echo "      2. Chuyển sang Chain ID 6666"
echo "      3. Reload trang"
echo ""
echo "Nếu muốn thêm thủ công:"
echo "   Network Name: Hardhat Local (6666)"
echo "   RPC URL:      http://127.0.0.1:8545"
echo "   Chain ID:     6666"
echo "   Currency:     ETH"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔑 IMPORT ACCOUNT (nếu cần):"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Owner (969,900 MTK):"
echo "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎯 FEATURES:"
echo "   ✅ Tự động kiểm tra Chain ID"
echo "   ✅ Tự động chuyển Chain ID (1 click)"
echo "   ✅ Hiển thị hướng dẫn rõ ràng"
echo "   ✅ Không cần thao tác thủ công!"
echo ""
