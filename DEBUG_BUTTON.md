# 🐛 Debug: Button Không Biến Mất

## 🔍 Các bước debug:

### Bước 1: Test isolate
Mở: **http://localhost:8080/debug-button.html**

Click "Test Connect" và xem:
- ✅ Nếu button biến mất → Vấn đề không phải CSS/HTML
- ❌ Nếu button KHÔNG biến mất → Có vấn đề với CSS

### Bước 2: Kiểm tra Console
Mở browser console (F12) khi ở trang chính:
1. Trước khi click "Kết nối MetaMask", xem logs:
   ```
   === ERC20 Demo App Loaded ===
   ✅ MetaMask detected
   ✅ Ethers.js loaded
   ✅ Connect button found
   ```

2. Click "Kết nối MetaMask"

3. Xem logs chi tiết:
   ```
   connectWallet called
   MetaMask detected
   Requesting accounts...
   Connected account: 0x...
   Contract instance created
   Updating UI...
   ✅ Wallet address set
   ✅ Connect button hidden   <-- Phải có dòng này!
   ✅ Wallet info shown
   ✅ Approval section shown
   ```

### Bước 3: Test bằng Console Commands

Paste vào console:
```javascript
// Kiểm tra elements
const btn = document.getElementById('connectButton');
const info = document.getElementById('walletInfo');
console.log('Button:', btn);
console.log('Button display:', window.getComputedStyle(btn).display);
console.log('Wallet info:', info);
console.log('Wallet info classes:', info.classList);
console.log('Wallet info display:', window.getComputedStyle(info).display);
```

### Bước 4: Force hide button
Nếu button không tự ẩn, paste vào console:
```javascript
document.getElementById('connectButton').style.display = 'none';
document.getElementById('walletInfo').classList.remove('hidden');
document.getElementById('approvalSection').classList.remove('hidden');
```

## 🔧 Các nguyên nhân có thể:

### 1. JavaScript error xảy ra trước khi hide button
- Kiểm tra: Có error màu đỏ trong console không?
- Fix: Xem error message và sửa

### 2. Contract không load được
- Kiểm tra: File `contract-address.json` có tồn tại?
- Kiểm tra: File `MyToken.json` có tồn tại?
- Fix: Chạy lại `npx hardhat run scripts/deploy.js --network localhost`

### 3. MetaMask reject connection
- Kiểm tra: Có approve trong MetaMask popup không?
- Fix: Approve connection

### 4. CSS conflict (hiếm)
- Test: Trang debug-button.html
- Fix: Nếu test page OK nhưng main page không OK → có CSS conflict

### 5. Cache browser
- Fix: Hard refresh (Cmd+Shift+R hoặc Ctrl+Shift+R)
- Fix: Clear browser cache
- Fix: Mở Incognito/Private window

## 📝 Debug Checklist:

- [ ] Console có logs "✅ Connect button hidden" không?
- [ ] Console có error màu đỏ không?
- [ ] MetaMask popup có xuất hiện không?
- [ ] Đã approve trong MetaMask chưa?
- [ ] File contract-address.json có chưa?
- [ ] File MyToken.json có chưa?
- [ ] Test page debug-button.html hoạt động không?
- [ ] Đã clear cache chưa?

## 🎯 Expected Behavior:

**Trước khi connect:**
```
[Button "Kết nối MetaMask" - VISIBLE]
[Wallet info - HIDDEN]
[Approval tabs - HIDDEN]
```

**Sau khi connect:**
```
[Button "Kết nối MetaMask" - HIDDEN]
[Wallet info - VISIBLE]
  - Địa chỉ: 0x...
  - Số dư: X MTK
  - Button "Ngắt kết nối"
[Approval tabs - VISIBLE]
  - Approve
  - Transfer
  - TransferFrom
  - Kiểm tra
```

## 🚨 Quick Fix:

Nếu vẫn không được, thêm vào console sau khi connect:
```javascript
// Manual fix
document.getElementById('connectButton').remove();
document.getElementById('walletInfo').style.display = 'block';
document.getElementById('approvalSection').style.display = 'block';
```

## 📞 Cần thêm thông tin:

Nếu vẫn lỗi, cung cấp:
1. Screenshot console logs
2. Screenshot MetaMask popup
3. Output của command trong console:
   ```javascript
   checkElements()  // từ debug.js
   ```
