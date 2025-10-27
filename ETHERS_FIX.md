# ✅ Fix: ethers is not defined

## 🔍 Vấn đề:
```
❌ Lỗi: ethers is not defined
```

## 🔧 Nguyên nhân:
1. Script ethers.js chưa load xong khi code chạy
2. CDN có thể bị chặn hoặc chậm
3. Code check `typeof ethers` quá sớm

## ✅ Đã sửa:

### 1. **Cập nhật CDN URL**
```html
<!-- CŨ -->
<script src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js"></script>

<!-- MỚI - Version 5.7.2 ổn định hơn -->
<script 
    src="https://cdn.ethers.io/lib/ethers-5.7.2.umd.min.js" 
    type="text/javascript"
    crossorigin="anonymous">
</script>
```

### 2. **Wrap code trong window.load**
```javascript
// CŨ - chạy ngay lập tức
console.log('Ethers:', typeof ethers !== 'undefined' ? '✅' : '❌');

// MỚI - đợi page load xong
window.addEventListener('load', function() {
    setTimeout(() => {
        if (typeof ethers === 'undefined') {
            console.error('❌ Ethers.js failed to load!');
            showAlert('❌ Lỗi: ethers.js không load được', 'error');
        } else {
            console.log('✅ Ethers.js loaded successfully');
        }
    }, 100);
});
```

## 🧪 Test:

### Test 1: Ethers Load Test
```
Mở: http://localhost:8080/test-ethers.html
```

**Kỳ vọng thấy:**
- ✅ Ethers is defined (immediate check)
- ✅ Ethers is defined (after 100ms)  
- ✅ Ethers is defined (window.load)
- Click button → ✅ All tests passed!

### Test 2: Main App
```
Mở: http://localhost:8080
F12 → Console
```

**Kỳ vọng thấy:**
```
✅ Page loaded
MetaMask: ✅ Detected
✅ Ethers.js loaded successfully
```

**KHÔNG được thấy:**
```
❌ Ethers.js failed to load!
```

## 🚨 Nếu vẫn lỗi:

### Option 1: Thử CDN khác
Thay script tag bằng:
```html
<!-- jsDelivr CDN -->
<script src="https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js"></script>

<!-- HOẶC unpkg CDN -->
<script src="https://unpkg.com/ethers@5.7.2/dist/ethers.umd.min.js"></script>
```

### Option 2: Check browser console
```
F12 → Console → Xem có lỗi nào về loading script không?
```

Có thể thấy:
- `Failed to load resource` → CDN bị block
- `CORS error` → Thêm crossorigin attribute
- No error nhưng ethers undefined → Script load muộn

### Option 3: Hard refresh
```
Cmd+Shift+R (Mac)
Ctrl+Shift+R (Windows/Linux)
```

### Option 4: Check network
```
F12 → Network tab → Reload → Tìm "ethers"
```

File ethers phải có:
- Status: 200 (OK)
- Type: script
- Size: > 0 bytes

### Option 5: Offline fallback
Download ethers.js về local:
```bash
cd public
curl -O https://cdn.ethers.io/lib/ethers-5.7.2.umd.min.js
```

Rồi đổi trong HTML:
```html
<script src="./ethers-5.7.2.umd.min.js"></script>
```

## 📋 Checklist:

Khi mở http://localhost:8080:

### Browser Console phải có:
- [ ] ✅ Page loaded
- [ ] MetaMask: ✅ Detected
- [ ] ✅ Ethers.js loaded successfully

### Không được có:
- [ ] ❌ ethers is not defined
- [ ] ❌ Ethers.js failed to load
- [ ] ❌ Failed to load resource
- [ ] ❌ CORS error

### Visual check:
- [ ] Button "Kết nối MetaMask" hiển thị
- [ ] Click button → MetaMask popup xuất hiện
- [ ] Sau khi connect → Thấy địa chỉ ví và số dư
- [ ] 4 tabs hiển thị (Approve, Transfer, TransferFrom, Kiểm tra)

## 💡 Debug commands:

Paste vào console để debug:
```javascript
// Check ethers
console.log('Ethers:', typeof ethers);
console.log('Ethers version:', ethers?.version);

// Check window.ethereum
console.log('MetaMask:', typeof window.ethereum);

// Check if script loaded
const scripts = document.querySelectorAll('script');
scripts.forEach(s => {
    if (s.src.includes('ethers')) {
        console.log('Ethers script:', s.src);
        console.log('Loaded:', s.readyState);
    }
});

// Try manual test
if (typeof ethers !== 'undefined') {
    console.log('Test address validation:', 
        ethers.utils.isAddress('0x0000000000000000000000000000000000000000'));
} else {
    console.log('Ethers not available!');
}
```

## 🎯 Kết quả mong đợi:

Sau khi sửa, khi mở http://localhost:8080:

1. ✅ Console không có lỗi màu đỏ
2. ✅ Console có "✅ Ethers.js loaded successfully"  
3. ✅ Button kết nối hoạt động
4. ✅ MetaMask popup xuất hiện khi click
5. ✅ Sau connect, thấy địa chỉ và số dư
6. ✅ Các chức năng Approve/Transfer hoạt động

---

**File đã cập nhật:**
- `public/index.html` - Updated ethers CDN và load logic
- `public/test-ethers.html` - NEW - Test ethers.js loading
