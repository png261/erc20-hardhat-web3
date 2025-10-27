╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ✅ SETUP METAMASK VỚI CHAIN ID MỚI (6666)                  ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

🎯 TẤT CẢ ĐÃ SẴN SÀNG:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Hardhat Node:       Running on port 8545
✅ Chain ID:           6666 (NEW!)
✅ Contract Deployed:  0x5FbDB2315678afecb367f032d93F642f64180aa3
✅ Tokens Distributed: Owner 969,900 MTK | Alice/Bob/Charlie 10,000 MTK each
✅ CLI Test:           All functions working ✅✅✅
✅ Frontend:           http://localhost:3001 (running)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📱 CẤU HÌNH METAMASK (3 BƯỚC ĐƠN GIẢN):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────┐
│ BƯỚC 1: THÊM NETWORK MỚI                                    │
└─────────────────────────────────────────────────────────────┘

1. Mở MetaMask extension
2. Click network dropdown (ở trên cùng)
3. Click "Add Network"
4. Chọn "Add a network manually"
5. Điền thông tin:

   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃ Network Name:     Hardhat Local                      ┃
   ┃ RPC URL:          http://127.0.0.1:8545              ┃
   ┃ Chain ID:         6666          👈 SỐ MỚI!          ┃
   ┃ Currency Symbol:  ETH                                ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

6. Click "Save"
7. Switch sang network "Hardhat Local"


┌─────────────────────────────────────────────────────────────┐
│ BƯỚC 2: IMPORT TEST ACCOUNTS                                │
└─────────────────────────────────────────────────────────────┘

Click vào account icon → Import Account → Paste private key:

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ACCOUNT #0 (Owner)                                        ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ Private Key:                                              ┃
┃ 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784 ┃
┃ d7bf4f2ff80                                              ┃
┃                                                           ┃
┃ Address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266      ┃
┃ Balance: 10,000 ETH + 969,900 MTK                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ACCOUNT #1 (Alice)                                        ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ Private Key:                                              ┃
┃ 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f46 ┃
┃ 03b6b78690d                                              ┃
┃                                                           ┃
┃ Address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8      ┃
┃ Balance: 10,000 ETH + 10,070 MTK                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ACCOUNT #2 (Bob)                                          ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ Private Key:                                              ┃
┃ 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a8 ┃
┃ 04cdab365a                                               ┃
┃                                                           ┃
┃ Address: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC      ┃
┃ Balance: 10,000 ETH + 10,000 MTK                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


┌─────────────────────────────────────────────────────────────┐
│ BƯỚC 3: TEST TRÊN WEB                                       │
└─────────────────────────────────────────────────────────────┘

1. Mở browser: http://localhost:3001

2. Click "Connect Wallet" → Chọn account Owner

3. TEST CÁC CHỨC NĂNG:

   ✅ Tab "Check" 
      → Nhập: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
      → Phải hiển thị: 969,900 MTK

   ✅ Tab "Transfer"
      → To: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (Alice)
      → Amount: 100
      → Click Transfer → Approve trong MetaMask

   ✅ Tab "Approve"
      → Spender: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC (Bob)
      → Amount: 500
      → Click Approve → Approve trong MetaMask

   ✅ Tab "TransferFrom"
      → Switch sang account Bob trong MetaMask
      → From: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (Owner)
      → To: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (Alice)
      → Amount: 200
      → Click TransferFrom → Approve trong MetaMask

   ✅ Tab "Lịch sử"
      → Click "Refresh History"
      → Thấy tất cả transfers và approvals vừa làm

   ✅ Tab "Mua Token"
      → Nhập: 1000
      → Thấy: 1000 MTK = 1.0 ETH

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 KẾT QUẢ MONG ĐỢI:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Không còn lỗi "call revert exception"
✅ Balance hiển thị chính xác
✅ Transfer hoạt động
✅ Approve hoạt động
✅ TransferFrom hoạt động
✅ History hiển thị events
✅ Buy Token tính toán đúng

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 TẠI SAO CÁCH NÀY HIỆU QUẢ?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chain ID = Blockchain Identity
├─ Mỗi blockchain có Chain ID duy nhất
├─ MetaMask dùng Chain ID để phân biệt networks
├─ Chain ID 6666 ≠ Chain ID 31337 (cũ)
└─ Cache cũ không ảnh hưởng blockchain mới!

Đổi Chain ID từ 31337 → 6666:
✓ MetaMask coi như blockchain hoàn toàn mới
✓ Không cần clear cache/reset account
✓ Không có xung đột với blockchain cũ
✓ Mọi thứ hoạt động ngay từ đầu!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 READY TO GO! Mở http://localhost:3001 và test ngay!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
