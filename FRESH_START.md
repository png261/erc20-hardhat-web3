# 🚀 FRESH START - ĐỔI CHAIN ID ĐỂ TRÁNH CACHE

## ✅ ĐÃ THAY ĐỔI
- **Chain ID mới**: `1337` (thay vì `31337`)
- **Port**: `8545` (giữ nguyên)

Điều này sẽ làm MetaMask coi đây là một blockchain hoàn toàn mới, tránh mọi cache cũ!

## 🚀 HƯỚNG DẪN CHẠY LẠI

### Bước 1: Stop tất cả process đang chạy
```bash
# Nếu Hardhat node đang chạy → Nhấn Ctrl+C
# Nếu frontend đang chạy → Nhấn Ctrl+C
```

### Bước 2: Clean & Compile
```bash
rm -rf artifacts cache
npx hardhat compile
```

### Bước 3: Start Hardhat Node (Terminal 1)
```bash
npx hardhat node
```
> Sẽ hiển thị danh sách 20 accounts với private keys

### Bước 4: Deploy Contract (Terminal 2)
```bash
npx hardhat run scripts/deploy.js --network localhost
```
> Ghi nhớ contract address hiển thị

### Bước 5: Distribute Tokens
```bash
npx hardhat run scripts/distribute-tokens.js --network localhost
```

### Bước 6: Test Contract
```bash
npx hardhat run scripts/test-all-functions.js --network localhost
```
> Phải thấy ✅✅✅ TẤT CẢ CÁC CHỨC NĂNG HOẠT ĐỘNG BÌNH THƯỜNG!

### Bước 7: Setup MetaMask với Chain ID mới

#### 7.1. Thêm Network mới
1. Mở MetaMask
2. Click network dropdown → **Add Network** → **Add a network manually**
3. Điền:
   - **Network Name**: `Hardhat Local`
   - **RPC URL**: `http://127.0.0.1:8545`
   - **Chain ID**: `1337` ⚠️ (SỐ MỚI!)
   - **Currency Symbol**: `ETH`
4. Click **Save**
5. Switch sang network **Hardhat Local**

#### 7.2. Import Test Accounts
Import 3 accounts test (hoặc nhiều hơn nếu muốn):

**Account #0 (Owner)**
```
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
Address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

**Account #1 (Alice)**
```
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
Address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
```

**Account #2 (Bob)**
```
Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
Address: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
```

Mỗi account sẽ có:
- **10,000 ETH** (từ Hardhat)
- **10,000 MTK** (từ distribute script)

### Bước 8: Start Frontend (Terminal 3)
```bash
cd frontend
npm start
```
> Mở browser tại `http://localhost:3001`

### Bước 9: Test trên Web
1. Click **Connect Wallet**
2. Chọn account Owner trong MetaMask
3. Approve connection

#### Test các chức năng:

**Tab Check:**
- Nhập địa chỉ: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- Click "Kiểm tra"
- Phải hiển thị balance **965,500 MTK** ✅

**Tab Transfer:**
- To: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8` (Alice)
- Amount: `100`
- Click "Transfer" → Approve trong MetaMask
- Check lại balance của Alice phải tăng

**Tab Approve:**
- Spender: `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC` (Bob)
- Amount: `500`
- Click "Approve" → Approve trong MetaMask
- Check allowance

**Tab TransferFrom:**
- Switch account sang Bob trong MetaMask
- From: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266` (Owner)
- To: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8` (Alice)
- Amount: `200`
- Click "Transfer From" → Approve trong MetaMask

**Tab History:**
- Click "Refresh History"
- Phải thấy tất cả transfers và approvals vừa làm

**Tab Buy Token:**
- Nhập amount: `1000`
- Thấy calculation: `1000 MTK = 1 ETH`

## ✅ KẾT QUẢ MONG ĐỢI

- ✅ Không còn lỗi "call revert exception"
- ✅ Connect wallet thành công
- ✅ Balance hiển thị đúng
- ✅ Tất cả transactions hoạt động
- ✅ History tab hiển thị events
- ✅ MetaMask không cache blockchain cũ

## 🎯 TẠI SAO CÁCH NÀY HIỆU QUẢ?

**Chain ID = Blockchain Identity**
- Mỗi blockchain có một Chain ID duy nhất
- MetaMask dùng Chain ID để phân biệt các networks
- Đổi Chain ID = MetaMask coi như blockchain mới hoàn toàn
- Cache cũ (Chain ID 31337) không ảnh hưởng đến Chain ID 1337 mới

**Không cần:**
- ❌ Clear MetaMask activity data
- ❌ Reset accounts
- ❌ Xóa và thêm lại network (chỉ cần add network mới)

## 🔄 NẾU CẦN RESET LẠI SAU NÀY

Nếu sau này cần reset blockchain (restart Hardhat node):

```bash
# Stop node (Ctrl+C)
# Restart
npx hardhat node

# Deploy lại
npx hardhat run scripts/deploy.js --network localhost
npx hardhat run scripts/distribute-tokens.js --network localhost
```

**Trong MetaMask:** Chỉ cần **Reset Account** (Settings → Advanced → Reset Account) cho từng account đã import. Không cần xóa network!

---

**Ready to go! 🚀** Chain ID mới = Không còn cache cũ = Mọi thứ hoạt động mượt mà!
