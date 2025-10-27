━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✅ ĐÃ SẴN SÀNG - CHAIN ID: 6666
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Hardhat Node:  RUNNING (port 8545)
✅ Chain ID:      6666 (mới)
✅ Contract:      0x5FbDB2315678afecb367f032d93F642f64180aa3
✅ CLI Test:      Tất cả chức năng OK ✅✅✅
✅ Frontend:      http://localhost:3001

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📱 SETUP METAMASK (2 PHÚT)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BƯỚC 1: THÊM NETWORK
━━━━━━━━━━━━━━━━━━━━
MetaMask → Add Network → Add manually:

  Network Name:     Hardhat Local
  RPC URL:          http://127.0.0.1:8545
  Chain ID:         6666          👈 QUAN TRỌNG!
  Currency Symbol:  ETH

→ Save → Switch sang "Hardhat Local"


BƯỚC 2: IMPORT ACCOUNTS
━━━━━━━━━━━━━━━━━━━━━━
MetaMask → Import Account → Paste private key:

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 👤 OWNER (969,900 MTK)                                  ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae ┃
┃ 784d7bf4f2ff80                                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 👤 ALICE (10,070 MTK)                                   ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412 ┃
┃ f4603b6b78690d                                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 👤 BOB (10,000 MTK)                                     ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3f ┃
┃ b9a804cdab365a                                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


BƯỚC 3: MỞ WEB & TEST
━━━━━━━━━━━━━━━━━━━━━
1. Mở: http://localhost:3001
2. Click "Connect Wallet" → Chọn Owner
3. Test các chức năng:

   ✅ Check    → Nhập Owner address → Thấy 969,900 MTK
   ✅ Transfer → Gửi 100 MTK cho Alice
   ✅ Approve  → Cho Bob dùng 500 MTK
   ✅ TransferFrom → (Switch sang Bob) Transfer từ Owner
   ✅ Lịch sử  → Refresh → Thấy tất cả transactions
   ✅ Mua Token → Tính ETH cần để mua MTK

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🎯 ADDRESSES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Owner:   0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Alice:   0x70997970C51812dc3A010C7d01b50e0d17dc79C8
Bob:     0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
Charlie: 0x90F79bf6EB2c4f870365E785982E1f101E93b906

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  💡 TẠI SAO CHAIN ID 6666 FIX LỖI?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chain ID 6666 ≠ Chain ID 31337 (cũ)
→ MetaMask coi như blockchain hoàn toàn mới
→ Không có cache cũ
→ Không có lỗi "call revert exception"
→ Mọi thứ hoạt động ngay! ✨

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 READY! Mở http://localhost:3001 và test ngay!
