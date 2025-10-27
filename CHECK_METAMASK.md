╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║  🔍 KIỂM TRA METAMASK - CHAIN ID 6666                        ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

✅ THÔNG TIN HỆ THỐNG:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chain ID:          6666 (0x1a0a in hex)
Contract Address:  0x5FbDB2315678afecb367f032d93F642f64180aa3
RPC URL:           http://127.0.0.1:8545
Frontend:          http://localhost:3000
Owner Address:     0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Owner Balance:     969,900 MTK (đã verify qua CLI ✅)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 CHECKLIST - KIỂM TRA TỪNG BƯỚC:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ BƯỚC 1: KIỂM TRA NETWORK TRONG METAMASK                    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

1. Mở MetaMask extension
2. Nhìn lên TRÊN CÙNG của MetaMask
3. Bạn thấy tên network là gì?

   ✅ ĐÚNG: "Hardhat 6666" hoặc "Hardhat Local" 
   ❌ SAI:  "Localhost 8545", "Ethereum Mainnet", "Sepolia"

4. Click vào tên network → Settings → Networks
5. Click vào network đang dùng
6. Kiểm tra:
   
   ┌─────────────────────────────────────────────────────┐
   │ Network Name:     (tên gì cũng được)               │
   │ RPC URL:          http://127.0.0.1:8545            │
   │ Chain ID:         6666          👈 PHẢI LÀ 6666!   │
   │ Currency Symbol:  ETH                               │
   └─────────────────────────────────────────────────────┘

❓ Chain ID của bạn là bao nhiêu? _______


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ BƯỚC 2: KIỂM TRA ACCOUNT                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

1. Trong MetaMask, nhìn vào account hiện tại
2. Click vào account name để copy address
3. Address có phải là: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266?

   ✅ ĐÚNG: Đây là Owner account
   ❌ SAI:  Import lại account với private key:
           0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

4. Balance ETH phải là: ~10,000 ETH (hoặc gần đó)

   ✅ Có 10,000 ETH
   ❌ Không có hoặc số khác → Network sai hoặc account sai

❓ Address của bạn: _______________________________
❓ Balance ETH:     _______


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ BƯỚC 3: KIỂM TRA CHAIN ID TRONG BROWSER CONSOLE            ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

1. Mở browser (Chrome/Firefox/Brave)
2. Vào: http://localhost:3000
3. Nhấn F12 (hoặc Cmd+Option+I trên Mac) để mở Console
4. Trong Console, chạy lệnh này:

   await window.ethereum.request({ method: 'eth_chainId' })

5. Kết quả phải là:

   ✅ ĐÚNG: "0x1a0a"  (6666 trong hex)
   ❌ SAI:  "0x7a69"  (31337 - Chain ID cũ!)
           "0x539"   (1337 - Chain ID cũ!)
           Số khác   (Network sai!)

6. Nếu SAI → MetaMask đang kết nối network SAI!
   → Phải switch sang network có Chain ID 6666

❓ Kết quả của bạn: _______


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ BƯỚC 4: TEST KẾT NỐI WALLET                                ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

1. Tại http://localhost:3000
2. Click nút "Connect Wallet"
3. MetaMask popup hiện ra
4. Xem thông tin:
   
   Network:  Hardhat 6666 (hoặc tên network của bạn)
   Account:  0xf39F...2266
   
5. Click "Connect"
6. Xem Console (F12) có lỗi không?

❓ Có lỗi trong Console không? _______________


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ BƯỚC 5: TEST GỌI balanceOf                                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

1. Sau khi Connect Wallet thành công
2. Vào tab "Check"
3. Nhập address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
4. Click "Kiểm tra"
5. Kết quả:

   ✅ ĐÚNG: Hiển thị "Balance: 969,900 MTK"
   ❌ SAI:  Lỗi "call revert exception"

6. Nếu lỗi → Mở Console (F12), xem lỗi chi tiết

❓ Kết quả: _______________________________


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔧 NẾU VẪN LỖI "call revert exception":
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NGUYÊN NHÂN:
└─ MetaMask đang kết nối với Chain ID SAI (không phải 6666)

CÁCH FIX:

1. Xóa tất cả networks cũ trong MetaMask:
   Settings → Networks → Xóa "Localhost 8545", "Hardhat Local" CŨ

2. Thêm network MỚI:
   Add Network → Add manually:
   
   Network Name:     Hardhat 6666
   RPC URL:          http://127.0.0.1:8545
   Chain ID:         6666
   Currency Symbol:  ETH

3. Switch sang network "Hardhat 6666"

4. Clear activity data:
   Settings → Advanced → "Clear activity tab data"

5. Đóng browser HOÀN TOÀN (Cmd+Q / Alt+F4)

6. Mở lại browser

7. Làm lại từ BƯỚC 3 ở trên

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 CHẠY LẠI SCRIPT KIỂM TRA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

npx hardhat run scripts/check-metamask.js --network localhost

Kết quả phải hiển thị:
✅ Chain ID: 6666
✅ Contract tồn tại
✅ balanceOf THÀNH CÔNG: 969,900 MTK

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 QUAN TRỌNG NHẤT:
   Chain ID trong MetaMask PHẢI là 6666
   Kiểm tra bằng console: 
   await window.ethereum.request({ method: 'eth_chainId' })
   → Phải trả về "0x1a0a"
