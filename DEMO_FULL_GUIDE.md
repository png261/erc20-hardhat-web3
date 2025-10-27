# 🚀 HƯỚNG DẪN DEMO HOÀN CHỈNH - ERC20 Token App

## 📋 Mục Lục
1. [Reset Blockchain Network](#1-reset-blockchain-network)
2. [Chạy Backend (Hardhat)](#2-chạy-backend-hardhat)
3. [Deploy Contract](#3-deploy-contract)
4. [Setup MetaMask](#4-setup-metamask)
5. [Chạy Frontend (React)](#5-chạy-frontend-react)
6. [Demo Các Chức Năng](#6-demo-các-chức-năng)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. Reset Blockchain Network

### ⚠️ Khi nào cần reset?
- Contract address không đúng
- Lỗi "call revert exception"
- Hardhat node bị lỗi
- Muốn test lại từ đầu

### 🔄 Cách Reset

#### Bước 1: Dừng tất cả processes
```bash
# Dừng Hardhat node (Ctrl+C trong terminal đang chạy)
# Dừng React app (Ctrl+C trong terminal đang chạy)
```

#### Bước 2: Xóa cache Hardhat
```bash
cd /Users/png/Code/block-chain-mid
rm -rf artifacts/ cache/
```

#### Bước 3: Reset MetaMask
1. Mở MetaMask
2. Click vào **Settings** → **Advanced**
3. Kéo xuống → Click **"Clear activity tab data"**
4. Hoặc tốt hơn: **Reset Account** cho từng account bạn dùng
   - Click vào account avatar
   - Chọn account
   - Click 3 chấm → **Settings** → **Advanced** → **Reset Account**

#### Bước 4: Compile lại
```bash
npx hardhat compile
```

✅ **Hoàn thành reset!** Bây giờ bắt đầu từ đầu.

---

## 2. Chạy Backend (Hardhat)

### Terminal 1️⃣: Start Hardhat Node

```bash
cd /Users/png/Code/block-chain-mid
npx hardhat node
```

**Expected output:**
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.

Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

Account #2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC (10000 ETH)
...
```

✅ **Giữ terminal này chạy!** Đừng đóng.

📝 **Lưu lại:**
- Account #0 address
- Account #1 address  
- Account #2 address
- Private keys (để import vào MetaMask)

---

## 3. Deploy Contract

### Terminal 2️⃣: Deploy Smart Contract

**Mở terminal mới:**
```bash
cd /Users/png/Code/block-chain-mid
npx hardhat run scripts/deploy.js --network localhost
```

**Expected output:**
```
Deploying MyToken contract...
Contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Minted 1,000,000 MTK to deployer
Contract ABI saved to: public/MyToken.json
Contract address saved to: public/contract-address.json

✅ Deployment complete!
```

✅ **Contract đã deploy thành công!**

📝 **Lưu lại contract address:** `0x5FbDB2315678afecb367f032d93F642f64180aa3`

### ⚡ Copy Artifacts to React

```bash
cp public/contract-address.json frontend/src/
cp public/MyToken.json frontend/src/
```

---

## 4. Setup MetaMask

### 📥 Import Accounts từ Hardhat

#### Account #0 (Owner - có 1M MTK)
```
Address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

#### Account #1 (Spender)
```
Address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
```

#### Account #2 (Recipient)
```
Address: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
```

### 🔧 Cách Import:

1. Mở MetaMask
2. Click vào **avatar** → **Import Account**
3. Paste **Private Key** → **Import**
4. Lặp lại cho 3 accounts

### 🌐 Add Hardhat Network

1. MetaMask → **Settings** → **Networks** → **Add Network**
2. Điền thông tin:
   ```
   Network Name: Hardhat Local
   RPC URL: http://127.0.0.1:8545
   Chain ID: 31337
   Currency Symbol: ETH
   ```
3. **Save**
4. Switch sang **Hardhat Local** network

✅ **MetaMask đã sẵn sàng!**

---

## 5. Chạy Frontend (React)

### Terminal 3️⃣: Start React App

```bash
cd /Users/png/Code/block-chain-mid/frontend
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://10.175.40.151:3000

webpack compiled successfully
```

✅ **React app chạy tại:** http://localhost:3000

Browser sẽ tự động mở. Nếu không, mở manually: http://localhost:3000

---

## 6. Demo Các Chức Năng

### 🎬 Kịch Bản Demo Hoàn Chỉnh

#### **SETUP: Kiểm Tra Ban Đầu**

1. **Mở http://localhost:3000**
2. **Click "Kết nối MetaMask"**
3. **Chọn Account #0** → Approve
4. **Kiểm tra hiển thị:**
   - ✅ Địa chỉ: `0xf39F...2266`
   - ✅ Số dư: `1000000 MTK`

---

#### **DEMO 1: Approve Token** ⏱️ 1 phút

**Mục đích:** Account #0 approve cho Account #1 được sử dụng 500 MTK

**Các bước:**

1. **Vào tab "Approve"**

2. **Nhập thông tin:**
   ```
   Spender Address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
   Số lượng: 500
   ```

3. **Click "Approve"**

4. **MetaMask popup:**
   - Xem gas fee
   - Click **"Confirm"**

5. **Đợi confirmation:**
   - Alert: "Đang gửi transaction..."
   - Alert: "Đang chờ confirmation..."
   - Alert: "✅ Approve thành công 500 MTK"

✅ **Kết quả:** Account #1 được phép sử dụng 500 MTK của Account #0

---

#### **DEMO 2: Check Allowance** ⏱️ 30 giây

**Mục đích:** Xác nhận allowance vừa approve

**Các bước:**

1. **Vào tab "Kiểm tra"**

2. **Section: Check Allowance**
   ```
   Owner Address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
   Spender Address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
   ```

3. **Click "Kiểm tra Allowance"**

4. **Kết quả hiển thị:**
   ```
   Allowance: 500 MTK
   ```

✅ **Xác nhận:** Allowance chính xác

---

#### **DEMO 3: TransferFrom** ⏱️ 1.5 phút

**Mục đích:** Account #1 chuyển 200 MTK từ Account #0 sang Account #2

**Các bước:**

1. **Switch account trong MetaMask:**
   - Click avatar
   - Chọn **Account #1** (`0x7099...79C8`)
   - **Refresh trang web** (F5)

2. **Kết nối lại:**
   - Click "Kết nối MetaMask"
   - Chọn Account #1

3. **Vào tab "TransferFrom"**

4. **Nhập thông tin:**
   ```
   Từ địa chỉ (Owner): 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
   Đến địa chỉ (Recipient): 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
   Số lượng: 200
   ```

5. **Click "TransferFrom"**

6. **Quá trình:**
   - Alert: "Đang kiểm tra allowance..."
   - Alert: "Đang gửi transaction..."
   - MetaMask: Confirm
   - Alert: "✅ TransferFrom thành công 200 MTK"

✅ **Kết quả:** 
- Account #0: mất 200 MTK
- Account #2: nhận 200 MTK
- Allowance còn: 300 MTK

---

#### **DEMO 4: Verify Results** ⏱️ 1 phút

**Mục đích:** Kiểm tra số dư sau khi transferFrom

**Các bước:**

1. **Vào tab "Kiểm tra"**

2. **Check Balance - Account #0:**
   ```
   Address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
   Kết quả: 999800 MTK  (1,000,000 - 200)
   ```

3. **Check Balance - Account #1:**
   ```
   Address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
   Kết quả: 0 MTK  (chỉ transfer, không nhận)
   ```

4. **Check Balance - Account #2:**
   ```
   Address: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
   Kết quả: 200 MTK  (nhận từ transferFrom)
   ```

5. **Check Allowance còn lại:**
   ```
   Owner: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
   Spender: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
   Kết quả: 300 MTK  (500 - 200)
   ```

✅ **Tất cả đúng!**

---

#### **DEMO 5: Transfer Token** ⏱️ 1 phút

**Mục đích:** Account #0 chuyển trực tiếp 1000 MTK cho Account #1

**Các bước:**

1. **Switch về Account #0 trong MetaMask**
2. **Refresh trang** → Kết nối lại
3. **Vào tab "Transfer"**
4. **Nhập:**
   ```
   Địa chỉ nhận: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
   Số lượng: 1000
   ```
5. **Click "Chuyển Token"** → Confirm
6. **Verify:**
   - Account #0: 998,800 MTK
   - Account #1: 1,000 MTK

---

#### **DEMO 6: Test Error - Insufficient Allowance** ⏱️ 30 giây

**Mục đích:** Thử transferFrom vượt quá allowance

**Các bước:**

1. **Switch sang Account #1**
2. **Vào tab "TransferFrom"**
3. **Nhập số lượng: 500** (allowance chỉ còn 300)
4. **Click "TransferFrom"**
5. **Kết quả:**
   ```
   ❌ Allowance không đủ! Cần 500 MTK nhưng chỉ có 300 MTK
   ```

✅ **Validation hoạt động đúng!**

---

## 7. Troubleshooting

### ❌ Lỗi: "call revert exception"

**Nguyên nhân:**
- Contract chưa deploy
- Contract address không đúng
- MetaMask cache cũ

**Giải pháp:**
1. Reset blockchain (xem phần 1)
2. Deploy lại contract
3. Copy artifacts mới
4. Reset account trong MetaMask
5. Refresh trang web

---

### ❌ Lỗi: "MetaMask not connected"

**Giải pháp:**
1. Kiểm tra MetaMask đã unlock chưa
2. Kiểm tra đã switch đúng network (Hardhat Local)
3. Refresh trang → Click "Kết nối MetaMask"

---

### ❌ Lỗi: "User rejected transaction"

**Giải pháp:**
- Click "Confirm" trong MetaMask popup
- Nếu gas quá cao, kiểm tra lại Hardhat node

---

### ❌ React app không load

**Giải pháp:**
```bash
# Stop React app (Ctrl+C)
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

---

### ❌ Balance không cập nhật

**Giải pháp:**
- Đợi transaction confirm xong
- Refresh trang web
- Check lại trong tab "Kiểm tra"

---

## 📊 Checklist Demo

### Pre-Demo
- [ ] Hardhat node đang chạy
- [ ] Contract đã deploy
- [ ] Artifacts đã copy sang frontend
- [ ] React app đang chạy
- [ ] MetaMask đã import 3 accounts
- [ ] MetaMask đã switch Hardhat Local network
- [ ] Reset account trong MetaMask

### During Demo
- [ ] Account #0: Approve 500 MTK cho Account #1
- [ ] Check allowance = 500 MTK
- [ ] Account #1: TransferFrom 200 MTK từ #0 → #2
- [ ] Verify balances
- [ ] Check allowance còn 300 MTK
- [ ] Account #0: Transfer 1000 MTK cho Account #1
- [ ] Test error: TransferFrom 500 (allowance chỉ 300)

---

## 🎯 Tóm Tắt Commands

### Reset & Start
```bash
# 1. Reset
rm -rf artifacts/ cache/
npx hardhat compile

# 2. Terminal 1: Hardhat
npx hardhat node

# 3. Terminal 2: Deploy
npx hardhat run scripts/deploy.js --network localhost
cp public/contract-address.json frontend/src/
cp public/MyToken.json frontend/src/

# 4. Terminal 3: React
cd frontend && npm start
```

### MetaMask Reset
```
Settings → Advanced → Clear activity tab data
Settings → Advanced → Reset Account (cho từng account)
```

---

## ⏱️ Thời Gian Demo

- **Setup:** 3-5 phút
- **Demo đầy đủ:** 5-7 phút
- **Tổng cộng:** ~10 phút

---

## 💡 Tips Demo Thành Công

1. **Chuẩn bị trước:**
   - Copy các địa chỉ vào notepad
   - Test 1 lần trước khi demo
   - Đảm bảo internet ổn định

2. **Trong khi demo:**
   - Giải thích từng bước
   - Cho audience thấy MetaMask popup
   - Highlight các alert messages
   - Show console để thấy logs

3. **Nếu có lỗi:**
   - Giữ bình tĩnh
   - Check console
   - Có thể reset nhanh (3 phút)

---

## 🎉 Chúc Demo Thành Công!

**Questions?** Check console logs hoặc Hardhat terminal output.

**Ready to start?** Bắt đầu từ **Phần 1: Reset Blockchain Network**! 🚀
