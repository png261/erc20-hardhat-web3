#!/bin/bash

# 🔧 Fix Script - Khi gặp lỗi "call revert exception"

echo "🔧 ===== FIX: Call Revert Exception ====="
echo ""
echo "Vấn đề: MetaMask đang cache contract address cũ"
echo "Giải pháp: Reset MetaMask + Redeploy + Restart React"
echo ""

# 1. Show current contract
echo "📍 Contract hiện tại:"
if [ -f "public/contract-address.json" ]; then
    cat public/contract-address.json
else
    echo "Không tìm thấy contract-address.json"
fi
echo ""

# 2. Redeploy contract
echo "📍 Deploying contract mới..."
npx hardhat run scripts/deploy.js --network localhost
if [ $? -ne 0 ]; then
    echo "❌ Deploy failed!"
    exit 1
fi
echo ""

# 3. Distribute tokens
echo "📍 Distributing tokens..."
npx hardhat run scripts/distribute-tokens.js --network localhost
echo ""

# 4. Copy to React
echo "📍 Copying artifacts to React..."
cp public/contract-address.json frontend/src/
cp public/MyToken.json frontend/src/
echo "✅ Copied"
echo ""

# 5. Clear React cache
echo "📍 Clearing React cache..."
rm -rf frontend/node_modules/.cache
echo "✅ Cache cleared"
echo ""

echo "🎉 ===== BACKEND FIX COMPLETE ====="
echo ""
echo "📋 BÂY GIỜ LÀM GÌ:"
echo ""
echo "1️⃣  RESET METAMASK (QUAN TRỌNG!):"
echo "   - Mở MetaMask"
echo "   - Click vào account avatar (góc trên)"
echo "   - Chọn Settings ⚙️"
echo "   - Chọn Advanced"
echo "   - Kéo xuống, click 'Clear activity tab data'"
echo "   - Click 'Reset Account' (cho TỪNG account bạn dùng)"
echo ""
echo "2️⃣  RESTART REACT APP:"
echo "   - Dừng React app (Ctrl+C nếu đang chạy)"
echo "   - Chạy: cd frontend && npm start"
echo ""
echo "3️⃣  TEST LẠI:"
echo "   - Mở http://localhost:3001"
echo "   - Click 'Kết nối MetaMask'"
echo "   - Approve"
echo "   - Kiểm tra balance hiển thị"
echo ""
echo "📊 New Contract Address:"
cat public/contract-address.json | grep address
echo ""
echo "💡 Nếu vẫn lỗi, chạy: ./reset-and-setup.sh"
echo ""
