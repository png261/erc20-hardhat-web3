#!/bin/bash

# 🚀 Start React App
# Chạy script này trong terminal riêng sau khi chạy reset-and-setup.sh

echo "🎨 Starting React Development Server..."
echo ""

cd frontend

echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "📥 Installing dependencies..."
    npm install
fi

echo ""
echo "🚀 Starting app..."
echo ""
echo "✅ App will open at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop"
echo ""

npm start
