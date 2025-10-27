# 🌐 Hướng Dẫn Demo TransferFrom trên Web

## 🚀 Khởi động

### 1. Chạy Hardhat Node (Terminal 1)
```bash
npx hardhat node
```
Lưu lại các private keys hiển thị để import vào MetaMask.

### 2. Deploy Contract (Terminal 2)
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 3. Khởi động Web Server (Terminal 3)
```bash
cd public
python3 -m http.server 8080
```

### 4. Mở trình duyệt
Truy cập: `http://localhost:8080`

---

## 🦊 Cấu hình MetaMask

### Thêm Network Hardhat Local:
- **Network Name:** Hardhat Local
- **RPC URL:** http://127.0.0.1:8545
- **Chain ID:** 31337
- **Currency Symbol:** ETH

### Import Accounts:
Import ít nhất 2-3 accounts từ private keys của Hardhat node để demo.

**Ví dụ:**
- Account #0 (Owner): `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
- Account #1 (User1): `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`
- Account #2 (User2): `0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a`

---

## 🎯 Demo Scenarios

### Scenario 1: Approve & TransferFrom Cơ Bản

#### Bước 1: Kết nối Account #0 (Owner)
1. Click "Kết nối MetaMask"
2. Chọn Account #0
3. Xác nhận số dư: ~1,000,000 MTK

#### Bước 2: Transfer token cho User1
1. Chuyển sang tab **"Transfer"**
2. Nhập địa chỉ Account #1 (User1)
3. Nhập số lượng: `1000`
4. Click "Chuyển Token"
5. Xác nhận trong MetaMask

#### Bước 3: Chuyển sang Account #1 (User1)
1. Đổi account trong MetaMask sang Account #1
2. Reload trang web
3. Kết nối lại với Account #1
4. Kiểm tra số dư: ~1000 MTK

#### Bước 4: User1 Approve cho User2
1. Tab **"Approve"**
2. Nhập địa chỉ Account #2 (User2)
3. Nhập số lượng: `500`
4. Click "Approve Tokens"
5. Xác nhận trong MetaMask

#### Bước 5: Kiểm tra Allowance
1. Tab **"Kiểm tra"**
2. Owner Address: Địa chỉ Account #1
3. Spender Address: Địa chỉ Account #2
4. Click "Kiểm tra Allowance"
5. Kết quả: 500 MTK ✅

#### Bước 6: Chuyển sang Account #2 (User2)
1. Đổi account trong MetaMask sang Account #2
2. Reload trang
3. Kết nối với Account #2
4. Số dư ban đầu: 0 MTK

#### Bước 7: User2 dùng TransferFrom
1. Tab **"TransferFrom"**
2. Từ địa chỉ (Owner): Địa chỉ Account #1
3. Đến địa chỉ (Recipient): Địa chỉ Account #0 hoặc Account #2
4. Số lượng: `300`
5. Click "TransferFrom"
6. Xác nhận trong MetaMask

#### Bước 8: Kiểm tra kết quả
1. Quay lại Account #1 → Số dư giảm 300 MTK
2. Check allowance còn lại: 200 MTK (500 - 300)
3. Account nhận được thêm 300 MTK

---

### Scenario 2: Unlimited Approval

#### Bước 1: Account #1 approve unlimited cho Account #2
1. Kết nối Account #1
2. Tab "Approve"
3. Spender: Account #2
4. Amount: `115792089237316195423570985008687907853269984665640564039457584007913129639935`
   (hoặc dùng console: `2**256 - 1`)
5. Approve

#### Bước 2: User2 có thể transferFrom không giới hạn
- Miễn là Account #1 còn token, Account #2 có thể transferFrom bất kỳ số lượng nào

---

### Scenario 3: Revoke Approval (Hủy quyền)

#### Bước 1: Account #1 hủy approve
1. Kết nối Account #1
2. Tab "Approve"
3. Spender: Account #2
4. Amount: `0`
5. Approve

#### Bước 2: Kiểm tra
1. Tab "Kiểm tra"
2. Check allowance: 0 MTK ✅

#### Bước 3: Thử transferFrom (sẽ fail)
1. Đổi sang Account #2
2. Tab "TransferFrom"
3. Thử chuyển từ Account #1
4. ❌ Lỗi: "Allowance không đủ"

---

## 📊 Các Tab Chức Năng

### 🔓 Tab Approve
- **Mục đích:** Cho phép địa chỉ khác sử dụng token của bạn
- **Input:** Spender address, Amount
- **Output:** Transaction approved
- **Use case:** Trước khi cho phép DEX, lending protocol sử dụng token

### 💸 Tab Transfer
- **Mục đích:** Chuyển token trực tiếp từ ví của bạn
- **Input:** Recipient address, Amount
- **Output:** Tokens transferred
- **Use case:** Gửi token cho người khác

### 🔄 Tab TransferFrom
- **Mục đích:** Chuyển token từ address đã approve cho bạn
- **Input:** From address (owner), To address (recipient), Amount
- **Output:** Tokens transferred using allowance
- **Use case:** DEX swap, lending protocol deposit
- **⚠️ Lưu ý:** Cần có allowance trước khi sử dụng

### 🔍 Tab Kiểm tra
- **Kiểm tra Allowance:** Xem số lượng token một address được phép sử dụng
- **Kiểm tra Balance:** Xem số dư token của bất kỳ address nào

---

## 🎓 Concepts Quan Trọng

### 1. **Approve**
```
Owner → approve(Spender, Amount)
```
Cho phép Spender sử dụng Amount token của Owner

### 2. **TransferFrom**
```
Spender → transferFrom(Owner, Recipient, Amount)
```
Spender chuyển Amount token từ Owner sang Recipient (cần allowance)

### 3. **Allowance**
```
allowance(Owner, Spender) → Amount
```
Số lượng token Spender được phép sử dụng từ Owner

### 4. **Allowance Tracking**
- Giảm sau mỗi lần transferFrom
- Có thể set về 0 để revoke
- Có thể set MaxUint256 để unlimited

---

## 🔒 Security Best Practices

### ⚠️ Cảnh báo
1. **Kiểm tra allowance trước khi approve mới**
   - Một số token cần set về 0 trước khi approve số mới

2. **Không approve unlimited cho contract chưa audit**
   - Nên approve đúng số lượng cần thiết

3. **Revoke allowance sau khi sử dụng xong**
   - Set về 0 để bảo mật

4. **Kiểm tra địa chỉ contract**
   - Đảm bảo approve cho đúng contract

### ✅ Demo Safe Practices
```
1. Approve chỉ số lượng cần thiết
2. Kiểm tra allowance trước transferFrom
3. Revoke sau khi hoàn thành
4. Monitor transaction trên console
```

---

## 🐛 Troubleshooting

### Lỗi: "Cannot connect to network"
```bash
# Kiểm tra Hardhat node đang chạy
ps aux | grep hardhat

# Khởi động lại node
npx hardhat node
```

### Lỗi: "Allowance không đủ"
- Kiểm tra allowance bằng tab "Kiểm tra"
- Đảm bảo đã approve đủ số lượng

### Lỗi: "Số dư không đủ"
- Owner không có đủ token
- Transfer thêm token cho owner

### MetaMask không hiện transaction
- Kiểm tra đúng network (Hardhat Local)
- Kiểm tra đúng account
- Reset account trong MetaMask (Settings → Advanced → Reset Account)

---

## 📝 Testing Checklist

- [ ] Kết nối MetaMask thành công
- [ ] Hiển thị đúng số dư token
- [ ] Transfer token thành công
- [ ] Approve token thành công
- [ ] TransferFrom với allowance đủ → Thành công
- [ ] TransferFrom với allowance không đủ → Fail ✅
- [ ] Kiểm tra allowance chính xác
- [ ] Kiểm tra balance chính xác
- [ ] Revoke approval (set về 0) thành công
- [ ] Approve unlimited thành công

---

## 💡 Real-world Use Cases

### 1. DEX (Uniswap, PancakeSwap)
```
1. User approve USDT cho Router contract
2. User swap USDT → ETH
3. Router dùng transferFrom để lấy USDT từ user
4. Router gửi ETH cho user
```

### 2. Lending (Aave, Compound)
```
1. User approve DAI cho Lending Pool
2. User deposit DAI
3. Pool dùng transferFrom để lấy DAI từ user
4. Pool mint aToken cho user
```

### 3. NFT Marketplace
```
1. Owner approve NFT cho Marketplace contract
2. Marketplace list NFT để bán
3. Buyer mua NFT
4. Marketplace dùng transferFrom để chuyển NFT
```

---

## 🎉 Summary

Web interface này demo đầy đủ các tính năng:

✅ **Approve** - Cho phép sử dụng token  
✅ **Transfer** - Chuyển token trực tiếp  
✅ **TransferFrom** - Chuyển token qua allowance  
✅ **Check Allowance** - Kiểm tra quyền sử dụng  
✅ **Check Balance** - Kiểm tra số dư  

Đây là nền tảng của mọi DeFi protocol! 🚀
