# 🔧 FIX LỖI METAMASK "call revert exception"

## ✅ Contract hoạt động OK (đã test qua CLI)
Tất cả chức năng contract đều hoạt động bình thường qua CLI. Vấn đề là **MetaMask đang cache contract cũ**.

## 🚀 CÁCH FIX NHANH (3 phút)

### Bước 1: Reset MetaMask
1. Mở MetaMask
2. Click vào **Settings** (biểu tượng bánh răng)
3. Chọn **Advanced**
4. Kéo xuống cuối → Click **"Clear activity tab data"**
5. Confirm

### Bước 2: Reset Hardhat Network trong MetaMask
1. Trong MetaMask, click vào network dropdown (ở trên cùng)
2. Chọn **"Localhost 8545"**
3. Click vào **Settings** → **Networks**
4. Tìm **"Localhost 8545"**, click vào
5. **XÓA network này đi** (Delete)

### Bước 3: Thêm lại network mới
1. Trong MetaMask, click **Add Network**
2. Chọn **Add a network manually**
3. Điền thông tin:
   - Network Name: `Localhost 8545`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency Symbol: `ETH`
4. Click **Save**

### Bước 4: Reset accounts (nếu cần)
Nếu vẫn lỗi, reset từng account:
1. Click vào account icon
2. Chọn **Settings** → **Advanced**
3. Click **"Reset Account"** (chỉ xóa transaction history, không mất tiền)

### Bước 5: Import lại account test
```bash
# Account #0 (Owner)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

# Account #1 (Alice)  
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

# Account #2 (Bob)
Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
```

### Bước 6: Refresh trang web
1. Đóng hết tabs của ứng dụng
2. Mở lại: `http://localhost:3001`
3. Click **Connect Wallet**
4. Approve connection trong MetaMask

## 🎯 Test thử
Sau khi làm xong, thử:
1. Click **"Check"** tab
2. Nhập địa chỉ Owner: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
3. Click **"Kiểm tra"**
4. Phải hiển thị balance: **965,500 MTK** ✅

## 📝 Nếu vẫn lỗi
Chạy script reset hoàn toàn:
```bash
# Stop Hardhat node
# Trong terminal đang chạy node, nhấn Ctrl+C

# Xóa cache Hardhat
rm -rf artifacts cache

# Restart node
npx hardhat node

# Deploy lại (terminal mới)
npx hardhat run scripts/deploy.js --network localhost

# Phân phối tokens
npx hardhat run scripts/distribute-tokens.js --network localhost

# Test lại qua CLI
npx hardhat run scripts/test-all-functions.js --network localhost
```

Sau đó làm lại **Bước 1-6** ở trên.

## ✅ Kết quả mong đợi
- Balance hiển thị đúng
- Transfer hoạt động
- Approve hoạt động  
- TransferFrom hoạt động
- History tab hiển thị transactions
- Buy Token tab tính toán đúng

---
**Lý do lỗi**: MetaMask cache state cũ của blockchain. Khi Hardhat node restart, nó tạo blockchain mới với contract mới, nhưng MetaMask vẫn tìm contract cũ → call revert exception.
