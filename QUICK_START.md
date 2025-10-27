# 🚀 QUICK START - Reset & Demo trong 3 Phút

## Bước 1: Reset & Deploy (1 phút)

```bash
cd /Users/png/Code/block-chain-mid
./reset-and-setup.sh
```

**Kết quả:**
- ✅ Hardhat node chạy
- ✅ Contract deployed
- ✅ Tokens distributed (mỗi account có 10,000 MTK)
- ✅ Artifacts copied sang React

---

## Bước 2: Reset MetaMask (30 giây)

### Trong MetaMask:
1. **Settings** → **Advanced**
2. **Clear activity tab data** → Click
3. **Reset Account** (làm cho TỪNG account bạn đã import)

### Hoặc nhanh hơn:
- Switch sang từng account
- Gửi 0 ETH cho chính mình → reset nonce

---

## Bước 3: Start React App (30 giây)

**Terminal MỚI:**
```bash
cd /Users/png/Code/block-chain-mid
./start-frontend.sh
```

Hoặc:
```bash
cd frontend && npm start
```

**Mở browser:** http://localhost:3001

---

## Bước 4: Test Ngay! (1 phút)

### Test 1: Connect & Check Balance
1. Click **"Kết nối MetaMask"**
2. Chọn Account #0
3. Approve
4. **Kết quả:** Hiển thị `970000 MTK` (đã distribute 30,000 cho 3 accounts)

### Test 2: Approve
1. Tab **"Approve"**
2. Spender: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
3. Số lượng: `500`
4. Click Approve → Confirm

### Test 3: TransferFrom
1. Switch sang Account #1 trong MetaMask
2. Refresh page → Connect lại
3. Tab **"TransferFrom"**
4. Từ: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
5. Đến: `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC`
6. Số lượng: `200`
7. Click TransferFrom → Confirm

### Test 4: Verify
1. Tab **"Kiểm tra"**
2. Check balance Account #2:
   - Address: `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC`
   - **Kết quả:** `10200 MTK` (10,000 ban đầu + 200 từ transferFrom)

---

## ✅ Hoàn Thành!

Toàn bộ demo hoạt động perfect trong **~3 phút**!

---

## 🔧 Troubleshooting Nhanh

### ❌ Lỗi: "call revert exception"
```bash
# Reset lại:
./reset-and-setup.sh

# Reset MetaMask accounts
```

### ❌ React không start
```bash
cd frontend
rm -rf node_modules/.cache
npm start
```

### ❌ Balance không hiển thị
- Đảm bảo Hardhat node đang chạy
- Check contract address đúng
- Reset MetaMask account

---

## 📊 Token Distribution Mặc Định

| Account | Address | MTK Balance | ETH |
|---------|---------|-------------|-----|
| #0 (Owner) | 0xf39F...2266 | 970,000 | 10,000 |
| #1 | 0x7099...79C8 | 10,000 | 10,000 |
| #2 | 0x3C44...93BC | 10,000 | 10,000 |
| #3 | 0x90F7...b906 | 10,000 | 10,000 |

**Total:** 1,000,000 MTK

---

## 💡 One-Liner Commands

### Reset Everything
```bash
./reset-and-setup.sh && (sleep 2; cd frontend && npm start)
```

### Just Distribute More Tokens
```bash
npx hardhat run scripts/distribute-tokens.js --network localhost
```

### Kill All & Restart
```bash
pkill -f "hardhat node"; pkill -f "react-scripts"; sleep 2; ./reset-and-setup.sh
```

---

## 🎯 Demo Flow (Copy-Paste Addresses)

### Addresses cho demo:
```
Account #0 (Owner):
0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

Account #1 (Spender):
0x70997970C51812dc3A010C7d01b50e0d17dc79C8

Account #2 (Recipient):
0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
```

### Private Keys (import vào MetaMask):
```
Account #0:
0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1:
0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

Account #2:
0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
```

---

**Enjoy your ERC20 Demo! 🎉**
