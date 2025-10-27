# 🎬 TransferFrom CLI Demo Examples

## 📋 Tổng Quan

Script demo này minh họa **6 kịch bản thực tế** của hàm `transferFrom()` trong ERC20:

1. ✅ **Basic TransferFrom** - Approve và transfer cơ bản
2. ✅ **Multiple TransferFrom** - Transfer nhiều lần với cùng allowance
3. ❌ **Insufficient Allowance** - Lỗi khi transfer quá allowance
4. ✅ **Approve More** - Approve thêm và tiếp tục transfer
5. ✅ **Revoke Allowance** - Thu hồi quyền approve
6. ✅ **Unlimited Allowance** - Approve không giới hạn

---

## 🚀 Cách Chạy

### Bước 1: Đảm bảo Hardhat Node đang chạy

```bash
# Terminal 1
npx hardhat node
```

### Bước 2: Deploy contract (nếu chưa)

```bash
# Terminal 2
npx hardhat run scripts/deploy.js --network localhost
```

### Bước 3: Chạy demo

```bash
npx hardhat run scripts/demo-transferfrom-cli.js --network localhost
```

---

## 📊 Output Mẫu

### Initial State:
```
📋 SETUP:
Contract Address: 0x5FbDB...
Owner (Deployer):  0xf39F...2266
Alice (Spender):   0x7099...79C8
Bob (Recipient):   0x3C44...93BC
Charlie (User):    0x90F7...b906

📊 INITIAL BALANCES
Owner:        967,800 MTK
Alice:         10,000 MTK
Bob:           10,900 MTK
Charlie:       11,300 MTK
```

### Example 1: Basic TransferFrom
```
Step 1: Owner approves Alice for 1,000 MTK
✅ Approved!
   Allowance: 1,000 MTK

Step 2: Alice calls transferFrom()
✅ TransferFrom successful!
   Transferred: 500 MTK
   From: Owner → To: Bob
   Executed by: Alice
   Remaining Allowance: 500 MTK

📊 BALANCES AFTER EXAMPLE 1
Owner:        967,300 MTK  (-500)
Alice:         10,000 MTK  (unchanged)
Bob:           11,400 MTK  (+500)
Charlie:       11,300 MTK  (unchanged)
```

### Example 3: Insufficient Allowance (Error)
```
Step 1: Alice attempts to transfer 300 MTK...
❌ Transaction REVERTED (as expected)
   Error: ERC20InsufficientAllowance
   Reason: Insufficient allowance (need 300, have 200)
```

### Example 6: Unlimited Allowance
```
Step 1: Owner approves unlimited allowance
✅ Unlimited allowance approved!
   Allowance: 115792089237316195... (MAX_UINT256)

Step 2: Alice transfers 1,000 MTK
✅ TransferFrom successful!
   Remaining Allowance: 115792089237316195... (still MAX)

💡 Note: With unlimited allowance, the allowance never decreases!
```

---

## 🎓 Key Learnings

### 1. **TransferFrom Flow:**
```
Owner → approve(spender, amount)
Spender → transferFrom(owner, recipient, amount)
Result: Tokens move from Owner to Recipient
```

### 2. **Allowance Mechanics:**
- Initial approve: `allowance = 1000`
- After transfer 500: `allowance = 500`
- After transfer 300: `allowance = 200`
- If try transfer 300: ❌ REVERT (only 200 left)

### 3. **Special Cases:**
- **Revoke:** `approve(spender, 0)` → allowance = 0
- **Unlimited:** `approve(spender, MAX_UINT256)` → never decreases
- **Re-approve:** Can approve multiple times, overwrites previous

### 4. **Who Pays Gas:**
- `approve()` → Owner pays gas
- `transferFrom()` → Spender pays gas
- Tokens move from Owner, but Spender executes

---

## 📈 Summary of All Examples

| Example | Action | Owner Balance | Allowance | Result |
|---------|--------|---------------|-----------|--------|
| Initial | - | 967,800 | 0 | - |
| 1 | Approve 1,000 | 967,800 | 1,000 | ✅ |
| 1 | Transfer 500 | 967,300 | 500 | ✅ |
| 2 | Transfer 300 | 967,000 | 200 | ✅ |
| 3 | Transfer 300 | 967,000 | 200 | ❌ Insufficient |
| 4 | Approve 500 | 967,000 | 500 | ✅ |
| 4 | Transfer 400 | 966,600 | 100 | ✅ |
| 5 | Revoke (0) | 966,600 | 0 | ✅ |
| 5 | Transfer 100 | 966,600 | 0 | ❌ No allowance |
| 6 | Approve MAX | 966,600 | MAX | ✅ |
| 6 | Transfer 1,000 | 965,600 | MAX | ✅ |

**Total Transferred:** 2,200 MTK (all via Alice)
- To Bob: 900 MTK
- To Charlie: 1,300 MTK

---

## 🔧 Use Cases Thực Tế

### 1. **DEX (Decentralized Exchange)**
```javascript
// User approves DEX to spend tokens
user.approve(dexAddress, unlimited);

// DEX transfers tokens when user trades
dex.transferFrom(user, recipient, amount);
```

### 2. **Payment Gateway**
```javascript
// Customer approves merchant
customer.approve(merchantAddress, invoiceAmount);

// Merchant collects payment
merchant.transferFrom(customer, merchantWallet, invoiceAmount);
```

### 3. **Staking Contract**
```javascript
// User approves staking contract
user.approve(stakingContract, stakeAmount);

// Staking contract pulls tokens
stakingContract.transferFrom(user, stakingVault, stakeAmount);
```

### 4. **Subscription Service**
```javascript
// User approves unlimited for monthly billing
user.approve(subscriptionContract, MAX_UINT256);

// Service charges monthly
subscriptionContract.transferFrom(user, treasury, monthlyFee);
```

---

## 🎯 Test Scenarios

### Test 1: Normal Flow ✅
```bash
# Run demo - all should pass
npx hardhat run scripts/demo-transferfrom-cli.js --network localhost
```

### Test 2: Check Balances
```bash
# Verify final balances match
Owner: 965,600 MTK (started with 967,800, transferred 2,200)
Alice: 10,000 MTK (unchanged - only executor, not recipient)
Bob: 11,800 MTK (received 900 MTK)
Charlie: 12,600 MTK (received 1,300 MTK)
```

### Test 3: Verify on Frontend
1. Open http://localhost:3001
2. Connect Account #1 (Alice)
3. Tab "TransferFrom"
4. Try transferFrom with MAX_UINT256 allowance
5. Should work!

---

## 💡 Pro Tips

### 1. **Always Check Allowance First:**
```javascript
const allowance = await token.allowance(owner, spender);
if (allowance < amount) {
  console.log("Need to request approval first!");
}
```

### 2. **Unlimited Approval is Risky:**
```javascript
// Safer: Approve exact amount
token.approve(spender, exactAmount);

// Risky: Unlimited approval
token.approve(spender, MAX_UINT256);
```

### 3. **Revoke When Done:**
```javascript
// After service is done
token.approve(oldSpender, 0);
```

### 4. **Events to Track:**
```javascript
// Listen for Approval events
token.on("Approval", (owner, spender, amount) => {
  console.log(`${owner} approved ${spender} for ${amount}`);
});

// Listen for Transfer events
token.on("Transfer", (from, to, amount) => {
  console.log(`${amount} transferred from ${from} to ${to}`);
});
```

---

## 📚 Related Scripts

- **deploy.js** - Deploy contract
- **distribute-tokens.js** - Give tokens to test accounts
- **verify-contract.js** - Verify contract is working
- **demo-transferfrom-cli.js** - This demo (CLI version)
- **demo-transferFrom.js** - Original demo (simpler)

---

## 🐛 Troubleshooting

### Error: "Insufficient allowance"
**Solution:** Owner needs to approve more
```bash
owner.approve(spender, moreAmount);
```

### Error: "Insufficient balance"
**Solution:** Owner doesn't have enough tokens
```bash
# Check balance
await token.balanceOf(owner.address);
```

### Error: "Contract not deployed"
**Solution:** Deploy contract first
```bash
npx hardhat run scripts/deploy.js --network localhost
```

---

**Enjoy the demo! 🚀**

For web version, see: http://localhost:3001
