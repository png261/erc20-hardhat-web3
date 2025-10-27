# 🚀 Hướng Dẫn Sử Dụng React App - ERC20 Token Demo

## ✅ Hoàn Thành Setup

React app đã được tạo thành công và đang chạy!

**URL:** http://localhost:3000

---

## 📋 Yêu Cầu

### 1. Hardhat Node (Phải chạy)
```bash
npx hardhat node
```
- Chạy ở terminal riêng
- Port: 8545

### 2. MetaMask
- Đã cài đặt extension
- Đã thêm Hardhat Network:
  - Network Name: Hardhat Local
  - RPC URL: http://127.0.0.1:8545
  - Chain ID: 31337
  - Currency: ETH

### 3. Contract Deployed
```bash
npx hardhat run scripts/deploy.js --network localhost
```

---

## 🎯 Cách Sử Dụng

### Bước 1: Kết Nối MetaMask
1. Mở http://localhost:3000
2. Click **"Kết nối MetaMask"**
3. Chọn account trong MetaMask
4. Approve connection

✅ Sau khi kết nối, bạn sẽ thấy:
- Địa chỉ wallet
- Số dư MTK token
- 4 tabs chức năng

---

## 🔧 Các Chức Năng

### 1️⃣ Tab APPROVE
**Mục đích:** Cho phép một địa chỉ khác được quyền sử dụng token của bạn

**Cách dùng:**
1. Nhập địa chỉ **Spender** (người được phép sử dụng)
2. Nhập số lượng token muốn approve
3. Click **"Approve"**
4. Confirm transaction trong MetaMask

**Ví dụ:**
- Spender: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
- Số lượng: `100`

---

### 2️⃣ Tab TRANSFER
**Mục đích:** Chuyển token trực tiếp từ ví của bạn sang ví khác

**Cách dùng:**
1. Nhập địa chỉ nhận
2. Nhập số lượng
3. Click **"Chuyển Token"**
4. Confirm trong MetaMask

---

### 3️⃣ Tab TRANSFERFROM
**Mục đích:** Chuyển token từ ví người khác (đã approve cho bạn)

**Điều kiện:** Bạn phải có allowance từ owner

**Cách dùng:**
1. **Từ địa chỉ (Owner):** Người đã approve cho bạn
2. **Đến địa chỉ (Recipient):** Người nhận token
3. **Số lượng:** Không được vượt quá allowance
4. Click **"TransferFrom"**

**Lưu ý:** App sẽ tự động kiểm tra allowance trước khi gửi transaction

---

### 4️⃣ Tab KIỂM TRA

#### A. Check Allowance
Kiểm tra số lượng token mà spender được phép sử dụng

**Cách dùng:**
1. **Owner Address:** Người sở hữu token
2. **Spender Address:** Người được phép sử dụng
3. Click **"Kiểm tra Allowance"**

#### B. Check Balance
Kiểm tra số dư token của một địa chỉ

**Cách dùng:**
1. Nhập địa chỉ cần kiểm tra
2. Click **"Kiểm tra Balance"**

---

## 🧪 Kịch Bản Test Đầy Đủ

### Setup
```bash
# Terminal 1: Hardhat Node
npx hardhat node

# Terminal 2: Deploy Contract
npx hardhat run scripts/deploy.js --network localhost

# Terminal 3: React App
cd frontend && npm start
```

### Test Flow

#### 1. Kết nối 2 accounts
- Import account #0 và #1 từ Hardhat vào MetaMask
- Account #0 có 1,000,000 MTK (được mint khi deploy)

#### 2. Test Approve (Account #0)
```
1. Switch sang Account #0 trong MetaMask
2. Vào tab "Approve"
3. Spender: [Account #1 address]
4. Số lượng: 500
5. Approve
```

#### 3. Test Check Allowance
```
1. Vào tab "Kiểm tra"
2. Owner: [Account #0 address]
3. Spender: [Account #1 address]
4. Kiểm tra → Kết quả: 500 MTK
```

#### 4. Test TransferFrom (Account #1)
```
1. Switch sang Account #1 trong MetaMask
2. Vào tab "TransferFrom"
3. Từ địa chỉ: [Account #0 address]
4. Đến địa chỉ: [Account #2 address]
5. Số lượng: 200
6. TransferFrom
```

#### 5. Test Check Balance
```
Kiểm tra balance của:
- Account #0: 999,800 MTK (1,000,000 - 200)
- Account #1: 0 MTK (chỉ transfer, không nhận)
- Account #2: 200 MTK (nhận từ transferFrom)
```

#### 6. Test Allowance Sau TransferFrom
```
Check allowance:
- Owner: Account #0
- Spender: Account #1
- Kết quả: 300 MTK (500 - 200)
```

---

## 🎨 Tính Năng UI

### ✨ Alert System
- **Thành công:** Viền xanh lá
- **Lỗi:** Viền đỏ
- **Info:** Viền xanh dương
- Auto-hide sau 5 giây

### 🎯 Form Validation
- Tự động kiểm tra địa chỉ Ethereum hợp lệ
- Kiểm tra số lượng > 0
- Kiểm tra allowance trước khi transferFrom

### 📱 Responsive Design
- Hoạt động tốt trên mobile
- Tabs tự động wrap trên màn hình nhỏ

### 🔄 Auto-Update
- Balance tự động cập nhật sau mỗi transaction
- Listen account changes từ MetaMask
- Reload khi đổi chain

---

## 🐛 Xử Lý Lỗi Thường Gặp

### Lỗi: "Vui lòng cài đặt MetaMask"
**Giải pháp:** Cài đặt MetaMask extension

### Lỗi: "Địa chỉ không hợp lệ"
**Giải pháp:** Kiểm tra lại địa chỉ Ethereum (phải bắt đầu bằng 0x)

### Lỗi: "Allowance không đủ"
**Giải pháp:** 
1. Kiểm tra allowance hiện tại
2. Owner phải approve thêm
3. Giảm số lượng transferFrom

### Lỗi: "User rejected transaction"
**Giải pháp:** Click "Confirm" trong MetaMask

### Lỗi: "Insufficient funds"
**Giải pháp:** Account không đủ ETH để trả gas fee

---

## 📊 So Sánh với HTML Version

| Tính năng | HTML | React |
|-----------|------|-------|
| Ethers.js loading | ❌ Lỗi | ✅ Hoạt động |
| State management | ❌ Manual DOM | ✅ React state |
| Code organization | ❌ Scattered | ✅ Component-based |
| Development | ❌ Basic | ✅ Hot reload |
| Debugging | ❌ Khó | ✅ React DevTools |

---

## 🔧 Commands

### Chạy React App
```bash
cd frontend
npm start
```

### Build Production
```bash
cd frontend
npm run build
```

### Update Contract
Sau khi deploy lại contract:
```bash
# Copy artifacts mới
cp public/contract-address.json frontend/src/
cp public/MyToken.json frontend/src/

# React sẽ tự động reload
```

---

## 📁 Cấu Trúc Project

```
frontend/
├── src/
│   ├── App.js              # Main component
│   ├── App.css             # Styling
│   ├── contract-address.json   # Contract address
│   └── MyToken.json        # Contract ABI
├── public/
│   └── index.html
└── package.json
```

---

## 🎉 Thành Công!

React app đã giải quyết được vấn đề "ethers is not defined" của HTML version!

**Lợi ích:**
- ✅ Ethers.js import đúng cách
- ✅ State management tốt hơn
- ✅ Code dễ maintain
- ✅ Hot reload khi development
- ✅ Better error handling

**Truy cập ngay:** http://localhost:3000

---

## 💡 Tips

1. **Luôn kiểm tra MetaMask đã connect đúng network**
2. **Đợi transaction confirm trước khi làm transaction tiếp theo**
3. **Check allowance trước khi transferFrom**
4. **Import nhiều accounts từ Hardhat để test đầy đủ**
5. **Mở Console để xem logs chi tiết**

Chúc bạn test thành công! 🚀
