# 🔧 FIX: Call Revert Exception Error

## ❌ Lỗi Gặp Phải:

```
❌ Lỗi: call revert exception 
(method="balanceOf(address)", data="0x", ...)
```

## 🔍 Nguyên Nhân:

MetaMask đang **cache transaction history cũ** với contract address cũ. Khi Hardhat node restart hoặc bạn deploy lại contract, contract address mới nhưng MetaMask vẫn dùng cache cũ.

---

## ✅ GIẢI PHÁP - 3 Bước (2 phút)

### Bước 1: Reset Backend & Redeploy (30 giây)

**Chạy script tự động:**
```bash
cd /Users/png/Code/block-chain-mid
./fix-revert-error.sh
```

**Hoặc thủ công:**
```bash
# Deploy contract mới
npx hardhat run scripts/deploy.js --network localhost

# Distribute tokens
npx hardhat run scripts/distribute-tokens.js --network localhost

# Copy sang React
cp public/contract-address.json frontend/src/
cp public/MyToken.json frontend/src/

# Clear React cache
rm -rf frontend/node_modules/.cache
```

---

### Bước 2: Reset MetaMask (1 phút) ⚠️ QUAN TRỌNG!

#### Cách 1: Reset Account (KHUYÊN DÙNG)

**Cho TỪNG account bạn đã import:**

1. **Mở MetaMask**
2. **Click vào avatar** (hình tròn góc trên bên phải)
3. **Click vào Settings** ⚙️
4. **Click vào Advanced**
5. **Kéo xuống cuối trang**
6. **Click "Reset Account"** (màu đỏ)
7. **Confirm**

**Lặp lại cho Account #0, #1, #2** (hoặc tất cả accounts bạn dùng)

#### Cách 2: Clear Activity Data (Dễ hơn nhưng ít hiệu quả)

1. **Mở MetaMask**
2. **Settings** → **Advanced**
3. **"Clear activity tab data"**
4. **Confirm**

#### Cách 3: Nhanh nhất (nếu chỉ 1 transaction)

1. **Switch sang account bị lỗi**
2. **Send 0 ETH cho chính mình**
   - To: [địa chỉ account hiện tại]
   - Amount: 0
   - Confirm
3. Transaction này sẽ reset nonce

---

### Bước 3: Restart React & Test (30 giây)

```bash
# Dừng React app nếu đang chạy (Ctrl+C)

# Start lại
cd frontend && npm start
```

**Test:**
1. Mở http://localhost:3001
2. Click **"Kết nối MetaMask"**
3. Chọn account
4. **Approve**
5. ✅ **Balance hiển thị:** `970000 MTK` (hoặc `10000 MTK` nếu Account #1, #2)

---

## 🎯 Kiểm Tra Nhanh

### Check contract address đúng:

```bash
# Contract hiện tại
cat public/contract-address.json

# Contract React đang dùng
cat frontend/src/contract-address.json
```

**Hai file phải GIỐNG NHAU!**

### Check Hardhat node đang chạy:

```bash
ps aux | grep "hardhat node" | grep -v grep
```

Phải thấy process đang chạy.

### Check React đã load contract mới:

1. Mở browser
2. F12 → Console
3. Refresh trang
4. Xem có error về contract không

---

## 🔄 Nếu Vẫn Lỗi

### Option 1: Reset TOÀN BỘ (3 phút)

```bash
# 1. Kill tất cả
pkill -f "hardhat node"
pkill -f "react-scripts"

# 2. Reset & Setup lại
./reset-and-setup.sh

# 3. Reset MetaMask (xem bước 2 ở trên)

# 4. Start React
cd frontend && npm start
```

### Option 2: Xóa và Import lại MetaMask accounts

**CẢNH BÁO:** Chỉ làm với Hardhat test accounts (có private key)

1. **Remove account trong MetaMask:**
   - Click account → Remove account
   
2. **Import lại:**
   - Import account
   - Paste private key:
     ```
     Account #0: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
     Account #1: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
     Account #2: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
     ```

### Option 3: Dùng account khác

Nếu 1 account bị lỗi, thử switch sang account khác trong MetaMask.

---

## 📋 Checklist Troubleshooting

- [ ] Hardhat node đang chạy
- [ ] Contract đã deploy (check contract-address.json)
- [ ] Tokens đã distribute
- [ ] Artifacts đã copy sang frontend/src/
- [ ] React cache đã clear
- [ ] React app đã restart
- [ ] **MetaMask account đã reset** ← QUAN TRỌNG NHẤT!
- [ ] Browser đã refresh (hard refresh: Cmd+Shift+R)

---

## 💡 Tại Sao Phải Reset MetaMask?

**MetaMask cache 3 thứ:**

1. **Transaction history** - lịch sử giao dịch
2. **Nonce** - số thứ tự transaction
3. **Contract interactions** - lịch sử tương tác với contracts

Khi Hardhat reset, blockchain state mới hoàn toàn nhưng MetaMask vẫn nhớ state cũ → conflict → `call revert exception`

**Reset account = xóa cache = đồng bộ lại với blockchain mới**

---

## 🎉 Sau Khi Fix Xong

**Bạn sẽ thấy:**
- ✅ Balance hiển thị đúng
- ✅ Không còn error trong console
- ✅ Có thể approve/transfer/transferFrom bình thường

**Contract mới:**
```bash
cat public/contract-address.json
```

**Accounts có tokens:**
- Account #0: 970,000 MTK
- Account #1: 10,000 MTK
- Account #2: 10,000 MTK
- Account #3: 10,000 MTK

---

## 📞 Nếu Vẫn Cần Giúp

1. Check console errors (F12)
2. Check Hardhat node logs: `tail -f hardhat-node.log`
3. Verify contract deployed: `npx hardhat console --network localhost`
   ```javascript
   const MyToken = await ethers.getContractFactory("MyToken");
   const token = MyToken.attach("0x...");  // paste contract address
   await token.name();  // should return "MyToken"
   ```

---

**Ready to test? Bắt đầu từ Bước 1! 🚀**
