#!/bin/bash

echo "🔍 BUTTON DEBUG TEST"
echo ""

# Check if server is running
if ! lsof -ti:8080 > /dev/null 2>&1; then
    echo "❌ Web server không chạy!"
    echo "Chạy: cd public && python3 -m http.server 8080"
    exit 1
fi

echo "✅ Web server đang chạy"
echo ""

# Check files
echo "📁 Kiểm tra files:"
if [ -f "public/app.js" ]; then
    APP_JS_SIZE=$(stat -f%z "public/app.js" 2>/dev/null || stat -c%s "public/app.js" 2>/dev/null)
    echo "✅ app.js ($APP_JS_SIZE bytes)"
else
    echo "❌ app.js không tồn tại"
fi

if [ -f "public/index.html" ]; then
    HTML_SIZE=$(stat -f%z "public/index.html" 2>/dev/null || stat -c%s "public/index.html" 2>/dev/null)
    echo "✅ index.html ($HTML_SIZE bytes)"
else
    echo "❌ index.html không tồn tại"
fi

if [ -f "public/debug-button.html" ]; then
    echo "✅ debug-button.html"
else
    echo "❌ debug-button.html không tồn tại"
fi

echo ""
echo "🧪 Test Steps:"
echo ""
echo "1️⃣ Test isolation:"
echo "   Mở: http://localhost:8080/debug-button.html"
echo "   Click: Test Connect"
echo "   Kỳ vọng: Button biến mất, info xuất hiện"
echo ""
echo "2️⃣ Test main app:"
echo "   Mở: http://localhost:8080"
echo "   Mở Console (F12)"
echo "   Click: Kết nối MetaMask"
echo "   Xem logs trong console"
echo ""
echo "3️⃣ Logs cần thấy:"
echo "   ✅ connectWallet called"
echo "   ✅ MetaMask detected"
echo "   ✅ Connected account: 0x..."
echo "   ✅ Contract instance created"
echo "   ✅ Updating UI..."
echo "   ✅ Connect button hidden   <-- QUAN TRỌNG!"
echo "   ✅ Wallet info shown"
echo ""
echo "4️⃣ Nếu button KHÔNG biến mất:"
echo "   - Kiểm tra console có error màu đỏ?"
echo "   - Kiểm tra MetaMask đã approve?"
echo "   - Try: Hard refresh (Cmd+Shift+R)"
echo "   - Try: Paste debug.js vào console"
echo ""

# Try to grep for the hide button line
echo "🔎 Kiểm tra code..."
if grep -q "Connect button hidden" public/app.js; then
    echo "✅ Code có log 'Connect button hidden'"
else
    echo "⚠️  Code KHÔNG có log 'Connect button hidden'"
fi

if grep -q "style.display = 'none'" public/app.js; then
    echo "✅ Code có .style.display = 'none'"
else
    echo "❌ Code KHÔNG có .style.display = 'none'"
fi

echo ""
echo "📖 Xem thêm: DEBUG_BUTTON.md"
