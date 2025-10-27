#!/bin/bash

echo "🔍 Kiểm tra hệ thống..."
echo ""

# Check Hardhat node
if lsof -ti:8545 > /dev/null 2>&1; then
    echo "✅ Hardhat node đang chạy (port 8545)"
else
    echo "❌ Hardhat node KHÔNG chạy"
    echo "   Chạy: npx hardhat node"
fi

# Check web server
if lsof -ti:8080 > /dev/null 2>&1; then
    echo "✅ Web server đang chạy (port 8080)"
else
    echo "❌ Web server KHÔNG chạy"
    echo "   Chạy: cd public && python3 -m http.server 8080"
fi

echo ""
echo "📁 Kiểm tra files..."

# Check required files
if [ -f "public/contract-address.json" ]; then
    echo "✅ public/contract-address.json"
    CONTRACT_ADDR=$(grep -o '"address": "[^"]*"' public/contract-address.json | cut -d'"' -f4)
    echo "   Contract: $CONTRACT_ADDR"
else
    echo "❌ public/contract-address.json KHÔNG tồn tại"
fi

if [ -f "public/MyToken.json" ]; then
    echo "✅ public/MyToken.json"
else
    echo "❌ public/MyToken.json KHÔNG tồn tại"
fi

if [ -f "public/index.html" ]; then
    echo "✅ public/index.html"
else
    echo "❌ public/index.html KHÔNG tồn tại"
fi

if [ -f "public/app.js" ]; then
    echo "✅ public/app.js"
else
    echo "❌ public/app.js KHÔNG tồn tại"
fi

echo ""
echo "🌐 URLs để test:"
echo "   Main App:  http://localhost:8080"
echo "   Test Page: http://localhost:8080/test.html"
echo ""
echo "📋 Checklist MetaMask:"
echo "   1. MetaMask đã cài đặt extension"
echo "   2. Network: Hardhat Local (Chain ID: 31337)"
echo "   3. RPC URL: http://127.0.0.1:8545"
echo "   4. Đã import account từ Hardhat node"
echo ""
