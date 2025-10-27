# ERC20 Token với Hardhat và Web3 Interface

Dự án ERC20 Token với tính năng approve, cho phép một address approve các address khác sử dụng token của mình.

## 🚀 Tính năng

- ✅ Smart Contract ERC20 chuẩn với OpenZeppelin
- ✅ Tính năng Approve tokens cho các address khác
- ✅ Web interface đẹp mắt với MetaMask
- ✅ Kiểm tra số dư token
- ✅ Xem danh sách các approval đã thực hiện

## 📋 Yêu cầu

- Node.js (v16 trở lên)
- MetaMask extension trong browser
- Git

## 🛠️ Cài đặt

1. Dependencies đã được cài đặt sẵn. Nếu cần cài lại:

```bash
npm install
```

## 📝 Sử dụng

### Bước 1: Compile Smart Contract

```bash
npx hardhat compile
```

### Bước 2: Chạy Hardhat Node (Local Blockchain)

Mở terminal mới và chạy:

```bash
npx hardhat node
```

Lưu lại một private key từ các account được tạo ra để import vào MetaMask.

### Bước 3: Deploy Contract

Trong terminal khác, chạy:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Địa chỉ contract sẽ được lưu tự động vào `public/contract-address.json`.

### Bước 4: Cấu hình MetaMask

1. Mở MetaMask
2. Thêm network mới:
   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency Symbol: `ETH`

3. Import account từ private key của Hardhat node

### Bước 5: Chạy Web Interface

Mở file `public/index.html` bằng Live Server hoặc bất kỳ web server nào.

Hoặc sử dụng Python:

```bash
cd public
python3 -m http.server 8000
```

Sau đó truy cập: `http://localhost:8000`

## 💡 Cách sử dụng Web Interface

1. Click "Kết nối MetaMask" để kết nối ví
2. Nhập địa chỉ bạn muốn approve (spender address)
3. Nhập số lượng token muốn approve
4. Click "Approve Tokens"
5. Xác nhận transaction trong MetaMask
6. Xem kết quả trong danh sách approval

## 🎯 Các chức năng chính

### Smart Contract (MyToken.sol)

- `approveTokens(address spender, uint256 amount)`: Approve token cho một address
- `getAllowance(address owner, address spender)`: Xem số lượng đã approve
- `mint(address to, uint256 amount)`: Mint thêm token (chỉ owner)
- `balanceOf(address account)`: Xem số dư token

### Web Interface

- Kết nối MetaMask
- Hiển thị số dư token
- Approve token cho các address khác
- Xem danh sách approval

## 📁 Cấu trúc project

```
block-chain-mid/
├── contracts/
│   └── MyToken.sol          # Smart contract ERC20
├── scripts/
│   └── deploy.js            # Script deploy contract
├── public/
│   ├── index.html           # Frontend HTML
│   └── app.js               # Web3 JavaScript
├── hardhat.config.js        # Cấu hình Hardhat
└── package.json
```

## 🔧 Deploy lên Testnet (Sepolia)

1. Tạo file `.env`:

```bash
cp .env.example .env
```

2. Điền thông tin:
- `PRIVATE_KEY`: Private key của ví (có ETH Sepolia)
- `SEPOLIA_RPC_URL`: URL từ Alchemy hoặc Infura

3. Deploy:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## 🧪 Testing

Có thể thêm tests trong folder `test/`:

```bash
npx hardhat test
```

## 📄 License

MIT

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón!

---

**Lưu ý:** Đây là project demo cho mục đích học tập. Không sử dụng cho production mà không audit kỹ lưỡng.
# erc20-hardhat-web3
