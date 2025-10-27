#!/bin/bash

echo "🔥 RESET TOÀN BỘ HỆ THỐNG"
echo "================================"

# Kiểm tra Hardhat node có đang chạy không
if lsof -Pi :8545 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Hardhat node đang chạy trên port 8545"
    echo "❌ VUI LÒNG:"
    echo "   1. Tìm terminal đang chạy 'npx hardhat node'"
    echo "   2. Nhấn Ctrl+C để dừng node"
    echo "   3. Chạy lại script này"
    exit 1
fi

echo "✅ Port 8545 trống"
echo ""

# Xóa cache
echo "🗑️  Xóa cache Hardhat..."
rm -rf artifacts cache
echo "✅ Đã xóa cache"
echo ""

# Xóa contract artifacts cũ
echo "🗑️  Xóa contract artifacts cũ..."
rm -f public/contract-address.json
rm -f public/MyToken.json
rm -f frontend/src/contract-address.json
rm -f frontend/src/MyToken.json
echo "✅ Đã xóa artifacts cũ"
echo ""

# Compile contract
echo "🔨 Compile contract..."
npx hardhat compile
echo "✅ Compile xong"
echo ""

# Hướng dẫn tiếp
echo "================================"
echo "✅ RESET HOÀN TẤT!"
echo "================================"
echo ""
echo "📝 BƯỚC TIẾP THEO:"
echo ""
echo "1️⃣  Khởi động Hardhat node (Terminal 1):"
echo "    npx hardhat node"
echo ""
echo "2️⃣  Deploy contract (Terminal 2):"
echo "    npx hardhat run scripts/deploy.js --network localhost"
echo ""
echo "3️⃣  Phân phối tokens:"
echo "    npx hardhat run scripts/distribute-tokens.js --network localhost"
echo ""
echo "4️⃣  Test contract:"
echo "    npx hardhat run scripts/test-all-functions.js --network localhost"
echo ""
echo "5️⃣  Khởi động frontend:"
echo "    cd frontend && npm start"
echo ""
echo "6️⃣  Reset MetaMask (XEM FIX_METAMASK.md):"
echo "    - Clear activity tab data"
echo "    - Xóa và thêm lại network Localhost 8545"
echo "    - Reset account nếu cần"
echo ""
echo "================================"
