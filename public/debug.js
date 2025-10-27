// Debug helper functions
// Paste vào browser console để test

function checkElements() {
    console.log('=== KIỂM TRA CÁC ELEMENTS ===');
    
    const connectBtn = document.getElementById('connectButton');
    console.log('connectButton:', connectBtn ? '✅ Found' : '❌ Not found', connectBtn);
    
    const walletInfo = document.getElementById('walletInfo');
    console.log('walletInfo:', walletInfo ? '✅ Found' : '❌ Not found', walletInfo);
    if (walletInfo) {
        console.log('  - classList:', walletInfo.classList);
        console.log('  - display:', window.getComputedStyle(walletInfo).display);
    }
    
    const approvalSection = document.getElementById('approvalSection');
    console.log('approvalSection:', approvalSection ? '✅ Found' : '❌ Not found', approvalSection);
    if (approvalSection) {
        console.log('  - classList:', approvalSection.classList);
        console.log('  - display:', window.getComputedStyle(approvalSection).display);
    }
    
    const walletAddress = document.getElementById('walletAddress');
    console.log('walletAddress:', walletAddress ? '✅ Found' : '❌ Not found', walletAddress);
    if (walletAddress) {
        console.log('  - textContent:', walletAddress.textContent);
    }
    
    const balance = document.getElementById('balance');
    console.log('balance:', balance ? '✅ Found' : '❌ Not found', balance);
    if (balance) {
        console.log('  - textContent:', balance.textContent);
    }
}

function forceHideButton() {
    console.log('Force hiding connect button...');
    const btn = document.getElementById('connectButton');
    if (btn) {
        btn.style.display = 'none';
        console.log('✅ Button hidden');
    } else {
        console.log('❌ Button not found');
    }
}

function forceShowWalletInfo() {
    console.log('Force showing wallet info...');
    const info = document.getElementById('walletInfo');
    if (info) {
        info.classList.remove('hidden');
        console.log('✅ Wallet info shown');
        console.log('Display:', window.getComputedStyle(info).display);
    } else {
        console.log('❌ Wallet info not found');
    }
}

function forceShowApprovalSection() {
    console.log('Force showing approval section...');
    const section = document.getElementById('approvalSection');
    if (section) {
        section.classList.remove('hidden');
        console.log('✅ Approval section shown');
        console.log('Display:', window.getComputedStyle(section).display);
    } else {
        console.log('❌ Approval section not found');
    }
}

function testUI() {
    console.log('=== TESTING UI CHANGES ===');
    checkElements();
    console.log('\n--- Applying changes ---\n');
    forceHideButton();
    forceShowWalletInfo();
    forceShowApprovalSection();
    console.log('\n--- After changes ---\n');
    checkElements();
}

console.log('🔧 Debug functions loaded:');
console.log('  - checkElements()     : Kiểm tra tất cả elements');
console.log('  - forceHideButton()   : Ẩn button kết nối');
console.log('  - forceShowWalletInfo(): Hiện wallet info');
console.log('  - forceShowApprovalSection(): Hiện approval section');
console.log('  - testUI()            : Test toàn bộ UI');
