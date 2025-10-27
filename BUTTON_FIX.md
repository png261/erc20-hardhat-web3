# 🔧 Fix: Button Kết Nối MetaMask

## ✅ Đã sửa các vấn đề:

### 1. **Lỗi đường dẫn ABI**
- ❌ Trước: `../artifacts/contracts/MyToken.sol/MyToken.json` (404 error)
- ✅ Sau: Copy ABI vào `public/MyToken.json`

### 2. **Lỗi switchTab function**
- ❌ Trước: `event.target` không được định nghĩa
- ✅ Sau: Thêm parameter `element` vào function

### 3. **Thiếu error handling**
- ✅ Thêm console.log để debug
- ✅ Thêm alert cho lỗi MetaMask
- ✅ Thêm validation cho contract address

### 4. **Deploy script cải thiện**
- ✅ Tự động copy ABI vào public/ sau mỗi lần deploy
- ✅ Tạo thư mục public/ nếu chưa có

## 🧪 Cách test:

### Test 1: Kiểm tra console
1. Mở browser console (F12)
2. Reload trang `http://localhost:8080`
3. Xem logs:
   ```
   === ERC20 Demo App Loaded ===
   ✅ MetaMask detected
   ✅ Ethers.js loaded
   ✅ Connect button found
   ```

### Test 2: Test button đơn giản
1. Truy cập: `http://localhost:8080/test.html`
2. Click "Test Kết nối MetaMask"
3. Nếu thành công → button chính cũng sẽ hoạt động

### Test 3: Test button chính
1. Truy cập: `http://localhost:8080`
2. Click "Kết nối MetaMask"
3. Approve trong MetaMask popup
4. Xem thông tin ví hiển thị

## 📋 Checklist trước khi test:

- [ ] Hardhat node đang chạy (`npx hardhat node`)
- [ ] Contract đã được deploy (`npx hardhat run scripts/deploy.js --network localhost`)
- [ ] Web server đang chạy (`python3 -m http.server 8080` trong folder public)
- [ ] MetaMask đã cài đặt
- [ ] MetaMask đã thêm Hardhat Local network
- [ ] MetaMask đã import ít nhất 1 account

## 🚀 Chạy lại từ đầu:

### Terminal 1: Hardhat Node
```bash
cd /Users/png/Code/block-chain-mid
npx hardhat node
```

### Terminal 2: Deploy
```bash
cd /Users/png/Code/block-chain-mid
npx hardhat run scripts/deploy.js --network localhost
```

### Terminal 3: Web Server
```bash
cd /Users/png/Code/block-chain-mid/public
python3 -m http.server 8080
```

### Browser
1. Mở: `http://localhost:8080`
2. Mở Console (F12)
3. Click "Kết nối MetaMask"

## 🐛 Nếu vẫn lỗi:

### Lỗi: MetaMask không hiện popup
- Check: MetaMask có đang unlock không?
- Check: Browser có block popup không?
- Try: Click lại button

### Lỗi: Wrong network
- MetaMask phải ở network "Hardhat Local" (Chain ID: 31337)
- RPC URL: `http://127.0.0.1:8545`

### Lỗi: Contract not found
- Chạy lại: `npx hardhat run scripts/deploy.js --network localhost`
- Check file: `public/contract-address.json` có tồn tại không
- Check file: `public/MyToken.json` có tồn tại không

### Lỗi: Nonce too high
- Reset account trong MetaMask:
  - Settings → Advanced → Clear activity tab data

## 📂 Files đã thay đổi:

1. `public/app.js` - Sửa connectWallet(), loadContractData(), switchTab()
2. `public/index.html` - Sửa onclick handlers cho tabs
3. `scripts/deploy.js` - Thêm auto-copy ABI
4. `public/test.html` - **MỚI** - Test page đơn giản
5. `public/MyToken.json` - **MỚI** - Contract ABI (auto-generated)

## ✨ Kết quả mong đợi:

Sau khi click "Kết nối MetaMask":
1. ✅ MetaMask popup hiện ra
2. ✅ Approve connection
3. ✅ Button biến mất
4. ✅ Hiển thị địa chỉ ví
5. ✅ Hiển thị số dư MTK
6. ✅ Hiển thị 4 tabs: Approve, Transfer, TransferFrom, Kiểm tra
7. ✅ Status: "✅ Kết nối thành công!"
