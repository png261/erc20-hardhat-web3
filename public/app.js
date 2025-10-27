// Contract ABI - sẽ được tự động cập nhật sau khi compile
let contractABI = [];
let contractAddress = "";
let provider;
let signer;
let contract;
let userAddress;

// Switch between tabs
function switchTab(tabName, element) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    
    // Add active class to clicked button
    if (element) {
        element.classList.add('active');
    }
}


// Load contract address và ABI
async function loadContractData() {
    try {
        // Load contract address
        const addressResponse = await fetch('./contract-address.json');
        if (!addressResponse.ok) {
            throw new Error('Contract address file not found');
        }
        const addressData = await addressResponse.json();
        contractAddress = addressData.address;
        
        console.log('Contract address loaded:', contractAddress);
        
        // Load ABI - thử nhiều đường dẫn
        let abiData;
        try {
            // Thử đường dẫn relative từ public
            const abiResponse = await fetch('./MyToken.json');
            if (abiResponse.ok) {
                abiData = await abiResponse.json();
            }
        } catch (e) {
            console.log('Trying artifacts path...');
            // Fallback: thử từ root
            const abiResponse = await fetch('/artifacts/contracts/MyToken.sol/MyToken.json');
            abiData = await abiResponse.json();
        }
        
        contractABI = abiData.abi;
        console.log('Contract ABI loaded, functions:', contractABI.length);
        
    } catch (error) {
        console.error('Error loading contract data:', error);
        showStatus('❌ Lỗi: Không thể load thông tin contract. Hãy chắc chắn đã deploy contract.', 'error');
        throw error;
    }
}

// Kết nối với MetaMask
async function connectWallet() {
    console.log('connectWallet called');
    
    try {
        // Kiểm tra MetaMask
        if (typeof window.ethereum === 'undefined') {
            alert('Vui lòng cài đặt MetaMask extension!');
            showStatus('❌ MetaMask chưa được cài đặt!', 'error');
            return;
        }

        console.log('MetaMask detected');
        showStatus('Đang kết nối với MetaMask...', 'info');

        // Load contract data trước
        await loadContractData();
        
        if (!contractAddress) {
            showStatus('❌ Không tìm thấy contract address. Hãy deploy contract trước!', 'error');
            return;
        }

        console.log('Requesting accounts...');
        // Request account access
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });
        
        if (!accounts || accounts.length === 0) {
            showStatus('❌ Không có account nào được chọn', 'error');
            return;
        }
        
        userAddress = accounts[0];
        console.log('Connected account:', userAddress);
        
        // Setup provider và signer
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        
        // Tạo contract instance
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log('Contract instance created');
        
        // Hiển thị thông tin ví NGAY LẬP TỨC
        console.log('Updating UI...');
        const connectBtn = document.getElementById('connectButton');
        const walletInfo = document.getElementById('walletInfo');
        const approvalSection = document.getElementById('approvalSection');
        const walletAddressEl = document.getElementById('walletAddress');
        
        if (walletAddressEl) {
            walletAddressEl.textContent = userAddress;
            console.log('✅ Wallet address set');
        }
        
        if (connectBtn) {
            connectBtn.style.display = 'none';
            connectBtn.style.visibility = 'hidden';
            console.log('✅ Connect button hidden');
        } else {
            console.error('❌ Connect button not found!');
        }
        
        if (walletInfo) {
            walletInfo.classList.remove('hidden');
            walletInfo.classList.add('visible');
            walletInfo.style.display = 'block';
            console.log('✅ Wallet info shown');
        } else {
            console.error('❌ Wallet info element not found!');
        }
        
        if (approvalSection) {
            approvalSection.classList.remove('hidden');
            approvalSection.classList.add('visible');
            approvalSection.style.display = 'block';
            console.log('✅ Approval section shown');
        } else {
            console.error('❌ Approval section not found!');
        }
        
        // Load balance (không chặn UI)
        try {
            await updateBalance();
            console.log('✅ Balance updated');
        } catch (error) {
            console.error('Error updating balance:', error);
            // Không return, vẫn cho người dùng sử dụng
        }
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
                location.reload();
            } else {
                userAddress = accounts[0];
                document.getElementById('walletAddress').textContent = userAddress;
                updateBalance();
            }
        });
        
        // Listen for network changes
        window.ethereum.on('chainChanged', () => {
            location.reload();
        });
        
        showStatus('✅ Kết nối thành công!', 'success');
        
    } catch (error) {
        console.error('Error connecting wallet:', error);
        showStatus('❌ Lỗi kết nối: ' + error.message, 'error');
    }
}

// Cập nhật số dư token
async function updateBalance() {
    try {
        console.log('Fetching balance for:', userAddress);
        const balance = await contract.balanceOf(userAddress);
        console.log('Balance (raw):', balance.toString());
        
        const decimals = await contract.decimals();
        console.log('Decimals:', decimals);
        
        const formattedBalance = ethers.utils.formatUnits(balance, decimals);
        console.log('Formatted balance:', formattedBalance);
        
        const balanceEl = document.getElementById('balance');
        if (balanceEl) {
            balanceEl.textContent = `${formattedBalance} MTK`;
            console.log('✅ Balance updated in UI');
        }
    } catch (error) {
        console.error('❌ Error getting balance:', error);
        const balanceEl = document.getElementById('balance');
        if (balanceEl) {
            balanceEl.textContent = '0 MTK (error)';
        }
    }
}

// Approve tokens
async function approveTokens() {
    const spenderAddress = document.getElementById('spenderAddress').value;
    const amount = document.getElementById('approvalAmount').value;
    
    // Validation
    if (!spenderAddress || !ethers.utils.isAddress(spenderAddress)) {
        showStatus('Vui lòng nhập địa chỉ hợp lệ!', 'error');
        return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
        showStatus('Vui lòng nhập số lượng token hợp lệ!', 'error');
        return;
    }
    
    try {
        showStatus('Đang xử lý giao dịch...', 'info');
        
        // Get decimals
        const decimals = await contract.decimals();
        
        // Convert amount to wei
        const amountInWei = ethers.utils.parseUnits(amount, decimals);
        
        // Call approve function
        const tx = await contract.approveTokens(spenderAddress, amountInWei);
        
        showStatus('Đang chờ xác nhận giao dịch...', 'info');
        
        // Wait for transaction to be mined
        await tx.wait();
        
        showStatus(
            `✅ Approve thành công! ${amount} MTK đã được approve cho ${spenderAddress.substring(0, 10)}...`,
            'success'
        );
        
        // Clear inputs
        document.getElementById('spenderAddress').value = '';
        document.getElementById('approvalAmount').value = '';
        
        // Update approvals list
        await checkApproval(spenderAddress);
        
    } catch (error) {
        console.error('Error approving tokens:', error);
        let errorMessage = 'Lỗi khi approve token';
        
        if (error.code === 4001) {
            errorMessage = 'Giao dịch bị từ chối bởi người dùng';
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        showStatus(errorMessage, 'error');
    }
}

// Transfer tokens
async function transferTokens() {
    const toAddress = document.getElementById('transferTo').value;
    const amount = document.getElementById('transferAmount').value;
    
    // Validation
    if (!toAddress || !ethers.utils.isAddress(toAddress)) {
        showStatus('Vui lòng nhập địa chỉ hợp lệ!', 'error');
        return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
        showStatus('Vui lòng nhập số lượng token hợp lệ!', 'error');
        return;
    }
    
    try {
        showStatus('Đang xử lý giao dịch...', 'info');
        
        const decimals = await contract.decimals();
        const amountInWei = ethers.utils.parseUnits(amount, decimals);
        
        const tx = await contract.transfer(toAddress, amountInWei);
        
        showStatus('Đang chờ xác nhận giao dịch...', 'info');
        await tx.wait();
        
        showStatus(
            `✅ Chuyển thành công ${amount} MTK đến ${toAddress.substring(0, 10)}...`,
            'success'
        );
        
        // Clear inputs
        document.getElementById('transferTo').value = '';
        document.getElementById('transferAmount').value = '';
        
        // Update balance
        await updateBalance();
        
    } catch (error) {
        console.error('Error transferring tokens:', error);
        let errorMessage = 'Lỗi khi chuyển token';
        
        if (error.code === 4001) {
            errorMessage = 'Giao dịch bị từ chối bởi người dùng';
        } else if (error.message.includes('insufficient')) {
            errorMessage = 'Số dư không đủ';
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        showStatus(errorMessage, 'error');
    }
}

// TransferFrom tokens
async function transferFromTokens() {
    const fromAddress = document.getElementById('fromAddress').value;
    const toAddress = document.getElementById('toAddress').value;
    const amount = document.getElementById('transferFromAmount').value;
    
    // Validation
    if (!fromAddress || !ethers.utils.isAddress(fromAddress)) {
        showStatus('Vui lòng nhập địa chỉ FROM hợp lệ!', 'error');
        return;
    }
    
    if (!toAddress || !ethers.utils.isAddress(toAddress)) {
        showStatus('Vui lòng nhập địa chỉ TO hợp lệ!', 'error');
        return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
        showStatus('Vui lòng nhập số lượng token hợp lệ!', 'error');
        return;
    }
    
    try {
        showStatus('Đang kiểm tra allowance...', 'info');
        
        const decimals = await contract.decimals();
        const amountInWei = ethers.utils.parseUnits(amount, decimals);
        
        // Check allowance first
        const allowance = await contract.allowance(fromAddress, userAddress);
        if (allowance.lt(amountInWei)) {
            showStatus(
                `❌ Không đủ allowance! Bạn cần ${amount} MTK nhưng chỉ có ${ethers.utils.formatUnits(allowance, decimals)} MTK`,
                'error'
            );
            return;
        }
        
        showStatus('Đang xử lý giao dịch...', 'info');
        
        const tx = await contract.transferFrom(fromAddress, toAddress, amountInWei);
        
        showStatus('Đang chờ xác nhận giao dịch...', 'info');
        await tx.wait();
        
        showStatus(
            `✅ TransferFrom thành công! Đã chuyển ${amount} MTK từ ${fromAddress.substring(0, 10)}... đến ${toAddress.substring(0, 10)}...`,
            'success'
        );
        
        // Clear inputs
        document.getElementById('fromAddress').value = '';
        document.getElementById('toAddress').value = '';
        document.getElementById('transferFromAmount').value = '';
        
    } catch (error) {
        console.error('Error in transferFrom:', error);
        let errorMessage = 'Lỗi khi transferFrom';
        
        if (error.code === 4001) {
            errorMessage = 'Giao dịch bị từ chối bởi người dùng';
        } else if (error.message.includes('ERC20InsufficientAllowance')) {
            errorMessage = 'Allowance không đủ để thực hiện giao dịch';
        } else if (error.message.includes('ERC20InsufficientBalance')) {
            errorMessage = 'Số dư của owner không đủ';
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        showStatus(errorMessage, 'error');
    }
}

// Check allowance
async function checkAllowance() {
    const ownerAddr = document.getElementById('checkOwner').value;
    const spenderAddr = document.getElementById('checkSpender').value;
    
    if (!ownerAddr || !ethers.utils.isAddress(ownerAddr)) {
        showStatus('Vui lòng nhập địa chỉ owner hợp lệ!', 'error');
        return;
    }
    
    if (!spenderAddr || !ethers.utils.isAddress(spenderAddr)) {
        showStatus('Vui lòng nhập địa chỉ spender hợp lệ!', 'error');
        return;
    }
    
    try {
        const allowance = await contract.allowance(ownerAddr, spenderAddr);
        const decimals = await contract.decimals();
        const formattedAllowance = ethers.utils.formatUnits(allowance, decimals);
        
        document.getElementById('allowanceValue').textContent = `${formattedAllowance} MTK`;
        document.getElementById('allowanceResult').classList.remove('hidden');
        
        showStatus('✅ Đã kiểm tra allowance', 'success');
        
    } catch (error) {
        console.error('Error checking allowance:', error);
        showStatus('Lỗi khi kiểm tra allowance', 'error');
    }
}

// Check balance
async function checkBalance() {
    const address = document.getElementById('checkBalanceAddress').value;
    
    if (!address || !ethers.utils.isAddress(address)) {
        showStatus('Vui lòng nhập địa chỉ hợp lệ!', 'error');
        return;
    }
    
    try {
        const balance = await contract.balanceOf(address);
        const decimals = await contract.decimals();
        const formattedBalance = ethers.utils.formatUnits(balance, decimals);
        
        document.getElementById('balanceValue').textContent = `${formattedBalance} MTK`;
        document.getElementById('balanceResult').classList.remove('hidden');
        
        showStatus('✅ Đã kiểm tra balance', 'success');
        
    } catch (error) {
        console.error('Error checking balance:', error);
        showStatus('Lỗi khi kiểm tra balance', 'error');
    }
}

// Kiểm tra số lượng đã approve
async function checkApproval(spenderAddress) {
    try {
        const allowance = await contract.getAllowance(userAddress, spenderAddress);
        const decimals = await contract.decimals();
        const formattedAllowance = ethers.utils.formatUnits(allowance, decimals);
        
        // Hiển thị trong danh sách
        displayApproval(spenderAddress, formattedAllowance);
        
    } catch (error) {
        console.error('Error checking approval:', error);
    }
}

// Hiển thị approval
function displayApproval(address, amount) {
    const approvalList = document.getElementById('approvalList');
    const approvalsDiv = document.getElementById('approvals');
    
    approvalList.classList.remove('hidden');
    
    const approvalItem = document.createElement('div');
    approvalItem.className = 'approval-item';
    approvalItem.innerHTML = `
        <div class="approval-address">${address}</div>
        <div class="approval-amount">${amount} MTK</div>
    `;
    
    approvalsDiv.insertBefore(approvalItem, approvalsDiv.firstChild);
}

// Hiển thị status message
function showStatus(message, type) {
    const statusDiv = document.getElementById('status');
    if (!statusDiv) {
        console.error('Status div not found');
        return;
    }
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.style.display = 'block';
    
    // Auto hide after 5 seconds for success/info messages
    if (type === 'success' || type === 'info') {
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 5000);
    }
}

// Initialize when page loads
window.addEventListener('load', () => {
    console.log('=== ERC20 Demo App Loaded ===');
    console.log('Checking MetaMask...');
    
    if (typeof window.ethereum !== 'undefined') {
        console.log('✅ MetaMask detected');
    } else {
        console.log('❌ MetaMask not found');
    }
    
    if (typeof ethers !== 'undefined') {
        console.log('✅ Ethers.js loaded');
    } else {
        console.log('❌ Ethers.js not loaded');
    }
    
    // Test button
    const connectBtn = document.getElementById('connectButton');
    if (connectBtn) {
        console.log('✅ Connect button found');
    } else {
        console.error('❌ Connect button not found');
    }
});
