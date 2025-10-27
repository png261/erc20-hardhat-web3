# ✅ HƯỚNG DẪN NHANH - Fix Lỗi "Call Revert Exception"

## 📊 Trạng Thái Hiện Tại

✅ Hardhat node: **RUNNING**  
✅ Contract deployed: **0x5FbDB2315678afecb367f032d93F642f64180aa3**  
✅ Tokens distributed: **970,000 MTK (Owner)**  
✅ React app: **http://localhost:3001**  

**Contract hoạt động hoàn hảo!** Vấn đề chỉ ở MetaMask cache.

---

## 🔧 GIẢI PHÁP DUY NHẤT: Reset MetaMask

### ⚡ Làm Theo 3 Bước Này (1 phút):

---

### **BƯỚC 1: Mở MetaMask Settings**

1. Click **icon MetaMask** (con cáo) ở browser toolbar
2. Click **icon bánh răng** ⚙️ (Settings) - góc trên bên phải
3. Click **"Advanced"** ở sidebar bên trái

---

### **BƯỚC 2: Reset Account**

1. **Kéo xuống cuối trang** trong tab Advanced
2. Tìm button **"Clear activity and nonce data"** (hoặc "Reset Account")
3. **Click vào button đó**
4. Popup xuất hiện hỏi "Are you sure?" 
5. **Click "Clear"** hoặc **"Reset"**

✅ **Done!** Account đã reset.

---

### **BƯỚC 3: Refresh & Connect**

1. **Quay lại tab React app** (http://localhost:3001)
2. **Hard refresh:**
   - **Mac:** `Cmd + Shift + R`
   - **Windows:** `Ctrl + Shift + R`
3. **Click "Kết nối MetaMask"**
4. **Chọn account** → **Next** → **Connect**

---

## 🎉 KẾT QUẢ

Bạn sẽ thấy:

```
Địa chỉ: 0xf39F...2266
Số dư: 970000 MTK
```

**Không còn lỗi!** ✅

---

## ❓ Nếu Vẫn Lỗi?

### Option A: Reset Lần 2

Làm lại **BƯỚC 2** một lần nữa. Đôi khi cần reset 2 lần.

---

### Option B: Remove & Re-import Account

1. **MetaMask** → Click **avatar icon**
2. Click **3 chấm** (...) bên cạnh account name
3. **"Remove account"**
4. **"Import account"**
5. Paste private key:
```
0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```
6. **Import**
7. Refresh page → Connect lại

---

### Option C: Clear Activity Tab Data

1. **MetaMask** → **Settings** → **Advanced**
2. Tìm **"Clear activity tab data"**
3. **Click** → **Confirm**
4. Refresh browser → Connect lại

---

### Option D: Send 0 ETH to Self (Reset Nonce)

1. **MetaMask** → Click **"Send"**
2. **To:** Paste địa chỉ account hiện tại
```
0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```
3. **Amount:** `0`
4. **Next** → **Confirm**
5. Đợi transaction xong
6. Refresh page → Connect lại

---

## 🎓 Tại Sao Phải Reset?

MetaMask lưu cache:
- Transaction history
- Nonce (số thứ tự TX)
- Contract interactions

Khi Hardhat reset → Blockchain mới → MetaMask cache cũ → Conflict!

**Reset = Xóa cache = Đồng bộ lại**

---

## 📋 Checklist Trước Khi Reset

- [ ] MetaMask đang ở network **"Hardhat Local"**
- [ ] Chain ID: **31337**
- [ ] RPC URL: **http://127.0.0.1:8545**
- [ ] Account address: **0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266**

Nếu chưa setup network, xem: **METAMASK_SETUP_GUIDE.md**

---

## 🚀 After Reset Works

**Test ngay:**

1. **Tab "Kiểm tra"**
2. **Check Balance**
   - Address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
   - Click "Kiểm tra Balance"
   - Result: **970000 MTK** ✅

3. **Tab "Approve"**
   - Spender: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
   - Số lượng: `500`
   - Click "Approve"
   - MetaMask popup → **Confirm**
   - Alert: **✅ Approve thành công**

**App hoạt động hoàn hảo!** 🎉

---

## 💡 Pro Tip

**Mỗi khi restart Hardhat node:**
1. Reset MetaMask account (BƯỚC 2)
2. Refresh browser
3. Connect lại

**Hoặc chạy script:**
```bash
./reset-and-setup.sh
```
Rồi reset MetaMask.

---

## 📞 Need More Help?

**Full detailed guide:** [METAMASK_SETUP_GUIDE.md](METAMASK_SETUP_GUIDE.md)

**System check:**
```bash
npx hardhat run scripts/verify-contract.js --network localhost
```

**Should show:** `✅ CONTRACT IS WORKING CORRECTLY!`

---

**Bắt đầu với BƯỚC 1! Chỉ mất 1 phút! 🚀**
