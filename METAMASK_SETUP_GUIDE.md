# 🔧 HƯỚNG DẪN CHI TIẾT: Fix "Call Revert Exception" với MetaMask

## ✅ Xác Nhận: Contract Đang Hoạt Động Tốt

```
Contract: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Token Name: MyToken (MTK)
Total Supply: 1,000,000 MTK
Owner Balance: 970,000 MTK
Status: ✅ WORKING
```

**Vấn đề:** MetaMask cache cũ → Cần reset MetaMask

---

## 📋 SETUP METAMASK TỪNG BƯỚC

### **Phần 1: Đảm Bảo MetaMask Đã Cài Đặt**

1. **Kiểm tra MetaMask:**
   - Nhìn góc trên bên phải browser
   - Có icon con cáo màu cam/đỏ? → ✅ Đã cài
   - Không thấy? → [Cài đặt MetaMask](https://metamask.io/download/)

---

### **Phần 2: Add Hardhat Local Network**

#### **Bước 1: Mở MetaMask**
- Click vào icon MetaMask ở thanh toolbar browser

#### **Bước 2: Switch Network**
- Nhìn phía trên cùng, thấy network name (ví dụ: "Ethereum Mainnet")
- Click vào đó → Dropdown xuất hiện

#### **Bước 3: Add Network**
- Trong dropdown, kéo xuống dưới cùng
- Click **"Add network"** hoặc **"Add a custom network"**

#### **Bước 4: Add Network Manually**
- Click **"Add a network manually"** (góc dưới)

#### **Bước 5: Điền Thông Tin Network**

Copy-paste CHÍNH XÁC như sau:

```
Network Name:
Hardhat Local

RPC URL:
http://127.0.0.1:8545

Chain ID:
31337

Currency Symbol:
ETH
```

**Block Explorer URL:** (để trống)

#### **Bước 6: Save**
- Click **"Save"**
- MetaMask sẽ tự động switch sang "Hardhat Local"

✅ **Xác nhận:** Góc trên MetaMask hiện "Hardhat Local"

---

### **Phần 3: Import Hardhat Test Accounts**

#### **Account #0 - Owner (970,000 MTK)**

**Bước 1: Mở Import**
- Click vào **icon hình tròn** (avatar) góc trên bên phải
- Click **"Add account or hardware wallet"**
- Click **"Import account"**

**Bước 2: Paste Private Key**
- Dropdown: chọn **"Private Key"**
- Paste vào box:
```
0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```
- Click **"Import"**

**Bước 3: Rename Account (optional)**
- Click vào **3 chấm dọc** bên cạnh account name
- Click **"Account details"**
- Click vào tên account → đổi thành **"Hardhat #0"**
- Save

✅ **Account đã import!**
- Địa chỉ: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- Balance: ~10,000 ETH (từ Hardhat)

---

#### **Account #1 - Spender (10,000 MTK)** *(Optional)*

Lặp lại Phần 3, dùng private key này:
```
0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
```
Địa chỉ: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`

---

#### **Account #2 - Recipient (10,000 MTK)** *(Optional)*

Private key:
```
0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
```
Địa chỉ: `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC`

---

### **Phần 4: RESET ACCOUNT (Quan Trọng Nhất!)**

**⚠️ LÀM BƯỚC NÀY CHO TỪNG ACCOUNT ĐÃ IMPORT**

#### **Cách 1: Reset Account (Khuyên dùng)**

**Bước 1: Switch to Account**
- Click **avatar icon** → Chọn **"Hardhat #0"** (hoặc account cần reset)

**Bước 2: Open Settings**
- Click **icon bánh răng** ⚙️ (Settings) ở góc trên

**Bước 3: Go to Advanced**
- Sidebar bên trái → Click **"Advanced"**

**Bước 4: Scroll Down**
- Kéo xuống cuối trang

**Bước 5: Reset Account**
- Tìm button **"Clear activity and nonce data"** (có thể là "Reset Account" - màu đỏ)
- Click vào
- Popup xuất hiện: **"Are you sure you want to clear your account's activity and nonce data?"**
- Click **"Clear"** hoặc **"Reset"**

✅ **Account đã reset!**

**Bước 6: Lặp lại cho các accounts khác**
- Switch sang Account #1 → Repeat bước 1-5
- Switch sang Account #2 → Repeat bước 1-5

---

#### **Cách 2: Clear Activity Tab Data (Nhanh hơn nhưng ít hiệu quả)**

**Bước 1:**
- MetaMask → **Settings** ⚙️ → **Advanced**

**Bước 2:**
- Tìm **"Clear activity tab data"**
- Click
- Confirm

---

#### **Cách 3: Manual Reset bằng Transaction (Nếu cách 1, 2 không work)**

**Cho TỪNG account:**

1. **Switch to account** cần reset
2. Click **"Send"** button
3. **Recipient:** Paste địa chỉ account HIỆN TẠI (chính nó)
   - Ví dụ: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
4. **Amount:** `0`
5. Click **"Next"**
6. Click **"Confirm"**
7. Đợi transaction complete (~2 giây)

This resets the nonce!

---

### **Phần 5: Connect to React App**

#### **Bước 1: Check React App Đang Chạy**

Terminal:
```bash
cd /Users/png/Code/block-chain-mid/frontend
npm start
```

Browser sẽ mở: http://localhost:3001

#### **Bước 2: Hard Refresh Browser**

**Mac:**
- Press: `Cmd + Shift + R`

**Windows/Linux:**
- Press: `Ctrl + Shift + R`

Hoặc:
- Press `F12` → Right click reload button → **"Empty Cache and Hard Reload"**

#### **Bước 3: Connect MetaMask**

1. **Trên page React app**, click button **"Kết nối MetaMask"**

2. **MetaMask popup xuất hiện:**
   - Title: "Connect with MetaMask"
   - Shows: localhost:3001 wants to connect

3. **Select Account:**
   - Tick checkbox: **"Hardhat #0"** (hoặc account bạn muốn)
   - Click **"Next"**

4. **Permissions:**
   - Shows: "See address, account balance, activity and suggest transactions to approve"
   - Click **"Connect"**

#### **Bước 4: Verify Connection**

**✅ Success indicators:**

1. **Button biến mất**, hiện thông tin:
```
Địa chỉ: 0xf39F...2266
Số dư: 970000 MTK
```

2. **Console (F12) không có errors**

3. **4 tabs xuất hiện:** Approve, Transfer, TransferFrom, Kiểm tra

---

## 🐛 TROUBLESHOOTING

### ❌ Lỗi: "call revert exception" vẫn xuất hiện

**Nguyên nhân:** MetaMask vẫn cache cũ

**Giải pháp:**

#### **Option 1: Force Reset**
```bash
# Terminal 1: Kill everything
pkill -f "hardhat"
pkill -f "react"

# Terminal 2: Reset và start lại
cd /Users/png/Code/block-chain-mid
./reset-and-setup.sh

# Terminal 3: Start React
cd frontend && npm start
```

Sau đó:
1. **Remove và re-import ALL accounts** trong MetaMask
2. Hard refresh browser
3. Connect lại

#### **Option 2: Check Contract Address**

Console (F12):
```javascript
// Paste vào console
fetch('/contract-address.json')
  .then(r => r.json())
  .then(d => console.log('Contract:', d.address))
```

Output phải là:
```
Contract: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

Nếu khác → Contract file chưa update → Chạy:
```bash
cp public/contract-address.json frontend/src/
cp public/MyToken.json frontend/src/
```

#### **Option 3: Verify Network**

1. **MetaMask phải ở "Hardhat Local" network**
2. **Chain ID phải là 31337**
3. **RPC URL phải là http://127.0.0.1:8545**

Check:
- MetaMask → Settings → Networks → Hardhat Local → Edit
- Verify all fields match

---

### ❌ Lỗi: "Nonce too high"

**Giải pháp:**
- Reset account (Phần 4, Cách 1)

---

### ❌ Lỗi: "Internal JSON-RPC error"

**Giải pháp:**
- Hardhat node không chạy
- Check: `ps aux | grep hardhat`
- Start: `npx hardhat node`

---

### ❌ Balance hiển thị 0 MTK

**Nguyên nhân:** Tokens chưa distribute

**Giải pháp:**
```bash
npx hardhat run scripts/distribute-tokens.js --network localhost
```

Refresh page → Connect lại

---

## 📊 Expected State After Setup

### **MetaMask:**
- Network: **Hardhat Local** ✅
- Chain ID: **31337** ✅
- Account #0: **~10,000 ETH** ✅

### **React App:**
- URL: **http://localhost:3001** ✅
- Connected: **✅**
- Balance: **970,000 MTK** (Account #0) ✅

### **Backend:**
- Hardhat node: **Running** ✅
- Contract: **0x5FbDB2315678afecb367f032d93F642f64180aa3** ✅

---

## 🎯 Quick Test

**Sau khi connect thành công:**

1. **Tab "Kiểm tra"** → **Check Balance**
   - Address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
   - Click "Kiểm tra Balance"
   - **Result:** `970000 MTK` ✅

2. **Tab "Approve"**
   - Spender: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
   - Số lượng: `100`
   - Click "Approve"
   - MetaMask popup → **Confirm**
   - **Alert:** `✅ Approve thành công 100 MTK`

---

## 📞 Still Having Issues?

**Run diagnostic:**
```bash
cd /Users/png/Code/block-chain-mid
npx hardhat run scripts/verify-contract.js --network localhost
```

**Should show:**
```
✅ CONTRACT IS WORKING CORRECTLY!
```

**If shows error:**
```bash
./reset-and-setup.sh
```

Then redo **Phần 4: Reset Account** in MetaMask.

---

**Good luck! 🚀**

Nếu làm theo CHÍNH XÁC các bước trên, app sẽ hoạt động 100%!
