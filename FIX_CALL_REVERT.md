╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ⚠️  QUAN TRỌNG - PHẢI SETUP METAMASK VỚI CHAIN ID 6666    ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

🔴 LỖI BẠN GẶP:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
call revert exception (method="balanceOf(address)")
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 NGUYÊN NHÂN:
MetaMask đang kết nối với Chain ID CŨ (31337 hoặc 1337)
Nhưng Hardhat node hiện đang chạy Chain ID MỚI (6666)

🎯 GIẢI PHÁP - SETUP METAMASK MỚI (3 PHÚT):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                             ┃
┃   BƯỚC 1: XÓA NETWORK CŨ (NẾU CÓ)                          ┃
┃                                                             ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

1. Mở MetaMask extension
2. Click network dropdown (ở trên cùng)
3. Click "Settings" → "Networks"
4. Tìm network "Localhost 8545" hoặc "Hardhat Local" CŨ
5. Click "Delete" để xóa network cũ đi

   ⚠️  QUAN TRỌNG: Phải xóa network cũ để tránh nhầm lẫn!


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                             ┃
┃   BƯỚC 2: THÊM NETWORK MỚI VỚI CHAIN ID 6666               ┃
┃                                                             ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

1. Trong MetaMask, click network dropdown
2. Click "Add Network"
3. Chọn "Add a network manually"
4. Điền CHÍNH XÁC:

   ╔═══════════════════════════════════════════════════════╗
   ║                                                       ║
   ║  Network Name:     Hardhat 6666                      ║
   ║                                                       ║
   ║  RPC URL:          http://127.0.0.1:8545             ║
   ║                                                       ║
   ║  Chain ID:         6666          👈👈👈 QUAN TRỌNG!  ║
   ║                                                       ║
   ║  Currency Symbol:  ETH                               ║
   ║                                                       ║
   ╚═══════════════════════════════════════════════════════╝

5. Click "Save"
6. **Switch sang network "Hardhat 6666"**

   ⚠️  KiỂM TRA: Phải thấy "Hardhat 6666" ở trên cùng MetaMask!


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                             ┃
┃   BƯỚC 3: IMPORT ACCOUNT OWNER                             ┃
┃                                                             ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

1. Click vào account icon (ở góc phải trên)
2. Click "Import Account"
3. Paste private key này:

   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                                                        ┃
   ┃  0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5ef   ┃
   ┃  cae784d7bf4f2ff80                                    ┃
   ┃                                                        ┃
   ┃  (Copy toàn bộ, bao gồm 0x)                           ┃
   ┃                                                        ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

4. Click "Import"
5. Đổi tên account thành "Owner" để dễ nhận biết

   ✅ Phải thấy: 10,000 ETH trong account này!


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                             ┃
┃   BƯỚC 4: TEST TRÊN WEB                                    ┃
┃                                                             ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

1. Đóng HẾT tabs của ứng dụng trong browser

2. Mở tab mới: http://localhost:3000

3. Click "Connect Wallet"

4. Chọn account "Owner" trong MetaMask

5. Click "Connect" để approve

6. TEST:
   
   Tab "Check":
   ━━━━━━━━━━━
   → Nhập address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
   → Click "Kiểm tra"
   → ✅ PHẢI THẤY: Balance 969,900 MTK

   Nếu thấy số này → SUCCESS! ✅
   Nếu vẫn lỗi → Kiểm tra lại Chain ID trong MetaMask


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✅ CHECKLIST - PHẢI ĐẢM BẢO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ MetaMask network = "Hardhat 6666" (xem ở trên cùng)
☐ Chain ID = 6666 (KHÔNG PHẢI 31337, 1337, hay số khác!)
☐ RPC URL = http://127.0.0.1:8545
☐ Account Owner đã import (10,000 ETH)
☐ Đang ở network "Hardhat 6666" (chắc chắn!)
☐ Frontend: http://localhost:3000 (đã refresh)
☐ Đã click Connect Wallet và chọn Owner

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🔍 NẾU VẪN LỖI:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Mở MetaMask Settings → Advanced
2. Scroll xuống → Click "Clear activity tab data"
3. Confirm
4. Đóng browser hoàn toàn (Cmd+Q trên Mac)
5. Mở lại browser
6. Làm lại từ Bước 4

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📊 THÔNG TIN HỆ THỐNG:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Hardhat Node:     Running on port 8545
✅ Chain ID:         6666
✅ Contract Address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
✅ Frontend:         http://localhost:3000
✅ Owner Balance:    969,900 MTK

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 QUAN TRỌNG NHẤT: CHAIN ID PHẢI LÀ 6666!
   Kiểm tra lại trong MetaMask Settings → Networks → Hardhat 6666
