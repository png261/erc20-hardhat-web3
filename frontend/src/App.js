import React, { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

// Import contract data
import contractAddressData from './contract-address.json';
import contractABI from './MyToken.json';

function App() {
  // State
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('0');
  const [contract, setContract] = useState(null);
  const [activeTab, setActiveTab] = useState('approve');
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [chainIdError, setChainIdError] = useState(null);
  const [isCheckingChain, setIsCheckingChain] = useState(false);

  // Form states
  const [approveSpender, setApproveSpender] = useState('');
  const [approveAmount, setApproveAmount] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferFromOwner, setTransferFromOwner] = useState('');
  const [transferFromTo, setTransferFromTo] = useState('');
  const [transferFromAmount, setTransferFromAmount] = useState('');
  const [checkAllowanceOwner, setCheckAllowanceOwner] = useState('');
  const [checkAllowanceSpender, setCheckAllowanceSpender] = useState('');
  const [allowanceResult, setAllowanceResult] = useState('');
  const [checkBalanceAddress, setCheckBalanceAddress] = useState('');
  const [balanceResult, setBalanceResult] = useState('');
  
  // History states
  const [transferHistory, setTransferHistory] = useState([]);
  const [allowanceHistory, setAllowanceHistory] = useState([]);
  
  // Buy token states
  const [buyAmount, setBuyAmount] = useState('');
  const [tokenPrice] = useState('0.001'); // 1 MTK = 0.001 ETH

  // Show alert
  const showAlert = (message, type = 'info') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
  };

  // Check Chain ID on load
  React.useEffect(() => {
    const checkChainId = async () => {
      if (window.ethereum) {
        setIsCheckingChain(true);
        try {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          const chainIdDecimal = parseInt(chainId, 16);
          const expectedChainId = 6666;

          if (chainIdDecimal !== expectedChainId) {
            setChainIdError({
              current: chainIdDecimal,
              currentHex: chainId,
              expected: expectedChainId,
              expectedHex: '0x1a0a'
            });
          }
        } catch (error) {
          console.error('Error checking chain ID:', error);
        }
        setIsCheckingChain(false);
      }
    };
    checkChainId();
  }, []);

  // Auto-switch Chain ID function
  const requestSwitchChain = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1a0a' }], // 6666 in hex
      });
      setChainIdError(null);
      showAlert('✅ Đã chuyển sang Chain ID 6666!', 'success');
      setTimeout(() => window.location.reload(), 1000);
    } catch (switchError) {
      // Chain doesn't exist, try to add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x1a0a',
              chainName: 'Hardhat Local (6666)',
              rpcUrls: ['http://127.0.0.1:8545'],
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18
              }
            }],
          });
          setChainIdError(null);
          showAlert('✅ Đã thêm và chuyển sang Chain ID 6666!', 'success');
          setTimeout(() => window.location.reload(), 1000);
        } catch (addError) {
          showAlert('❌ Lỗi khi thêm network: ' + addError.message, 'error');
        }
      } else {
        showAlert('❌ Lỗi khi chuyển network: ' + switchError.message, 'error');
      }
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        showAlert('❌ Vui lòng cài đặt MetaMask!', 'error');
        window.open('https://metamask.io/download/', '_blank');
        return;
      }

      showAlert('Đang kết nối...', 'info');

      // Check Chain ID first
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const chainIdDecimal = parseInt(chainId, 16);
      const expectedChainId = 6666;

      if (chainIdDecimal !== expectedChainId) {
        setChainIdError({
          current: chainIdDecimal,
          currentHex: chainId,
          expected: expectedChainId,
          expectedHex: '0x1a0a'
        });
        showAlert(`❌ Chain ID sai! Hiện tại: ${chainIdDecimal}, Cần: ${expectedChainId}`, 'error');
        return;
      }

      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = contractAddressData.address;
      const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

      setAccount(accounts[0]);
      setContract(contract);
      setChainIdError(null);

      // Load balance
      const balance = await contract.balanceOf(accounts[0]);
      const decimals = await contract.decimals();
      const formatted = ethers.utils.formatUnits(balance, decimals);
      setBalance(formatted);

      showAlert('✅ Kết nối thành công!', 'success');

      // Load history
      loadTransferHistory(contract, accounts[0]);
      loadAllowanceHistory(contract, accounts[0]);

      // Listen for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());

    } catch (error) {
      console.error('Connection error:', error);
      showAlert('❌ Lỗi: ' + error.message, 'error');
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      window.location.reload();
    } else {
      setAccount(accounts[0]);
      updateBalance(accounts[0]);
    }
  };

  const updateBalance = async (address) => {
    if (!contract) return;
    try {
      const balance = await contract.balanceOf(address || account);
      const decimals = await contract.decimals();
      const formatted = ethers.utils.formatUnits(balance, decimals);
      setBalance(formatted);
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  // Load Transfer History
  const loadTransferHistory = async (contractInstance, userAddress) => {
    try {
      const filter = contractInstance.filters.Transfer(null, null);
      const events = await contractInstance.queryFilter(filter, 0, 'latest');
      
      const history = events
        .filter(event => 
          event.args.from.toLowerCase() === userAddress.toLowerCase() ||
          event.args.to.toLowerCase() === userAddress.toLowerCase()
        )
        .map(event => ({
          from: event.args.from,
          to: event.args.to,
          amount: ethers.utils.formatUnits(event.args.value, 18),
          blockNumber: event.blockNumber,
          type: event.args.from.toLowerCase() === userAddress.toLowerCase() ? 'sent' : 'received'
        }))
        .reverse()
        .slice(0, 10); // Latest 10 transactions
      
      setTransferHistory(history);
    } catch (error) {
      console.error('Error loading transfer history:', error);
    }
  };

  // Load Allowance History
  const loadAllowanceHistory = async (contractInstance, userAddress) => {
    try {
      const filter = contractInstance.filters.Approval(userAddress, null);
      const events = await contractInstance.queryFilter(filter, 0, 'latest');
      
      const history = events
        .map(event => ({
          owner: event.args.owner,
          spender: event.args.spender,
          amount: ethers.utils.formatUnits(event.args.value, 18),
          blockNumber: event.blockNumber
        }))
        .reverse()
        .slice(0, 10); // Latest 10 approvals
      
      setAllowanceHistory(history);
    } catch (error) {
      console.error('Error loading allowance history:', error);
    }
  };

  // Buy Token
  const handleBuyToken = async (e) => {
    e.preventDefault();
    if (!buyAmount || parseFloat(buyAmount) <= 0) {
      showAlert('❌ Số lượng không hợp lệ!', 'error');
      return;
    }

    try {
      showAlert('Đang mua token...', 'info');
      
      // Calculate ETH needed
      const tokenAmount = parseFloat(buyAmount);
      const ethNeeded = (tokenAmount * parseFloat(tokenPrice)).toString();
      
      // Get contract owner (who will send tokens)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      // Send ETH to contract owner and request tokens
      // Note: This is simplified. In production, you'd have a proper sale contract
      const decimals = await contract.decimals();
      const amountWei = ethers.utils.parseUnits(buyAmount, decimals);
      
      // For demo: Owner mints new tokens to buyer
      // In real scenario, buyer sends ETH and receives tokens from a sale contract
      showAlert('Đang gửi yêu cầu mua token...', 'info');
      
      // This requires owner to have a mint function or transfer function
      // For now, we'll just show the calculation
      const ethValue = ethers.utils.parseEther(ethNeeded);
      
      showAlert(`✅ Để mua ${buyAmount} MTK, bạn cần ${ethNeeded} ETH`, 'info');
      showAlert('⚠️ Chức năng mua token cần contract owner approve. Liên hệ owner để mua token!', 'info');
      
      setBuyAmount('');
    } catch (error) {
      console.error('Buy token error:', error);
      showAlert('❌ Lỗi: ' + error.message, 'error');
    }
  };

  // Approve
  const handleApprove = async (e) => {
    e.preventDefault();
    if (!ethers.utils.isAddress(approveSpender)) {
      showAlert('❌ Địa chỉ spender không hợp lệ!', 'error');
      return;
    }
    if (!approveAmount || parseFloat(approveAmount) <= 0) {
      showAlert('❌ Số lượng không hợp lệ!', 'error');
      return;
    }

    try {
      showAlert('Đang gửi transaction...', 'info');
      const decimals = await contract.decimals();
      const amountWei = ethers.utils.parseUnits(approveAmount, decimals);
      const tx = await contract.approve(approveSpender, amountWei);
      showAlert('Đang chờ confirmation...', 'info');
      await tx.wait();
      showAlert(`✅ Approve thành công ${approveAmount} MTK`, 'success');
      setApproveSpender('');
      setApproveAmount('');
    } catch (error) {
      console.error('Approve error:', error);
      showAlert('❌ Lỗi: ' + error.message, 'error');
    }
  };

  // Transfer
  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!ethers.utils.isAddress(transferTo)) {
      showAlert('❌ Địa chỉ không hợp lệ!', 'error');
      return;
    }
    if (!transferAmount || parseFloat(transferAmount) <= 0) {
      showAlert('❌ Số lượng không hợp lệ!', 'error');
      return;
    }

    try {
      showAlert('Đang gửi transaction...', 'info');
      const decimals = await contract.decimals();
      const amountWei = ethers.utils.parseUnits(transferAmount, decimals);
      const tx = await contract.transfer(transferTo, amountWei);
      showAlert('Đang chờ confirmation...', 'info');
      await tx.wait();
      showAlert(`✅ Chuyển thành công ${transferAmount} MTK`, 'success');
      setTransferTo('');
      setTransferAmount('');
      updateBalance();
    } catch (error) {
      console.error('Transfer error:', error);
      showAlert('❌ Lỗi: ' + error.message, 'error');
    }
  };

  // TransferFrom
  const handleTransferFrom = async (e) => {
    e.preventDefault();
    if (!ethers.utils.isAddress(transferFromOwner) || !ethers.utils.isAddress(transferFromTo)) {
      showAlert('❌ Địa chỉ không hợp lệ!', 'error');
      return;
    }
    if (!transferFromAmount || parseFloat(transferFromAmount) <= 0) {
      showAlert('❌ Số lượng không hợp lệ!', 'error');
      return;
    }

    try {
      showAlert('Đang kiểm tra allowance...', 'info');
      const decimals = await contract.decimals();
      const amountWei = ethers.utils.parseUnits(transferFromAmount, decimals);
      
      const allowance = await contract.allowance(transferFromOwner, account);
      if (allowance.lt(amountWei)) {
        const formatted = ethers.utils.formatUnits(allowance, decimals);
        showAlert(`❌ Allowance không đủ! Cần ${transferFromAmount} MTK nhưng chỉ có ${formatted} MTK`, 'error');
        return;
      }

      showAlert('Đang gửi transaction...', 'info');
      const tx = await contract.transferFrom(transferFromOwner, transferFromTo, amountWei);
      showAlert('Đang chờ confirmation...', 'info');
      await tx.wait();
      showAlert(`✅ TransferFrom thành công ${transferFromAmount} MTK`, 'success');
      setTransferFromOwner('');
      setTransferFromTo('');
      setTransferFromAmount('');
    } catch (error) {
      console.error('TransferFrom error:', error);
      showAlert('❌ Lỗi: ' + error.message, 'error');
    }
  };

  // Check Allowance
  const handleCheckAllowance = async (e) => {
    e.preventDefault();
    if (!ethers.utils.isAddress(checkAllowanceOwner) || !ethers.utils.isAddress(checkAllowanceSpender)) {
      showAlert('❌ Địa chỉ không hợp lệ!', 'error');
      return;
    }

    try {
      const allowance = await contract.allowance(checkAllowanceOwner, checkAllowanceSpender);
      const decimals = await contract.decimals();
      const formatted = ethers.utils.formatUnits(allowance, decimals);
      setAllowanceResult(`${formatted} MTK`);
      showAlert('✅ Đã kiểm tra allowance', 'success');
    } catch (error) {
      console.error('Check allowance error:', error);
      showAlert('❌ Lỗi: ' + error.message, 'error');
    }
  };

  // Check Balance
  const handleCheckBalance = async (e) => {
    e.preventDefault();
    if (!ethers.utils.isAddress(checkBalanceAddress)) {
      showAlert('❌ Địa chỉ không hợp lệ!', 'error');
      return;
    }

    try {
      const balance = await contract.balanceOf(checkBalanceAddress);
      const decimals = await contract.decimals();
      const formatted = ethers.utils.formatUnits(balance, decimals);
      setBalanceResult(`${formatted} MTK`);
      showAlert('✅ Đã kiểm tra balance', 'success');
    } catch (error) {
      console.error('Check balance error:', error);
      showAlert('❌ Lỗi: ' + error.message, 'error');
    }
  };

  return (
    <div className="App">
      {/* Alert */}
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}

      {/* Chain ID Warning */}
      {chainIdError && (
        <div className="chain-warning">
          <div className="chain-warning-content">
            <h3>⚠️ Chain ID không đúng!</h3>
            <div className="chain-info">
              <p><strong>Hiện tại:</strong> {chainIdError.current} ({chainIdError.currentHex})</p>
              <p><strong>Cần:</strong> {chainIdError.expected} ({chainIdError.expectedHex})</p>
            </div>
            <button onClick={requestSwitchChain} className="switch-chain-btn">
              🔄 Tự động chuyển sang Chain ID 6666
            </button>
            <div className="manual-instructions">
              <p><strong>Hoặc thêm thủ công trong MetaMask:</strong></p>
              <ul>
                <li>Network Name: <code>Hardhat Local (6666)</code></li>
                <li>RPC URL: <code>http://127.0.0.1:8545</code></li>
                <li>Chain ID: <code>6666</code></li>
                <li>Currency: <code>ETH</code></li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <h1>🪙 ERC20 Token Demo</h1>
        <p className="subtitle">Approve & TransferFrom with React</p>

        {/* Wallet Section */}
        <div className="wallet-section">
          {!account ? (
            <button onClick={connectWallet} className="connect-btn">
              Kết nối MetaMask
            </button>
          ) : (
            <div className="wallet-info">
              <div className="info-row">
                <strong>Địa chỉ:</strong>
                <span className="address">{account}</span>
              </div>
              <div className="info-row">
                <strong>Số dư:</strong>
                <span className="balance">{balance} MTK</span>
              </div>
              <button onClick={() => window.location.reload()} className="disconnect-btn">
                Ngắt kết nối
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        {account && (
          <div className="main-content">
            {/* Tabs */}
            <div className="tabs">
              <button 
                className={`tab-btn ${activeTab === 'approve' ? 'active' : ''}`}
                onClick={() => setActiveTab('approve')}
              >
                Approve
              </button>
              <button 
                className={`tab-btn ${activeTab === 'transfer' ? 'active' : ''}`}
                onClick={() => setActiveTab('transfer')}
              >
                Transfer
              </button>
              <button 
                className={`tab-btn ${activeTab === 'transferFrom' ? 'active' : ''}`}
                onClick={() => setActiveTab('transferFrom')}
              >
                TransferFrom
              </button>
              <button 
                className={`tab-btn ${activeTab === 'check' ? 'active' : ''}`}
                onClick={() => setActiveTab('check')}
              >
                Kiểm tra
              </button>
              <button 
                className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                Lịch sử
              </button>
              <button 
                className={`tab-btn ${activeTab === 'buy' ? 'active' : ''}`}
                onClick={() => setActiveTab('buy')}
              >
                Mua Token
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {/* Approve Tab */}
              {activeTab === 'approve' && (
                <form onSubmit={handleApprove}>
                  <h2>🔓 Approve Token</h2>
                  <div className="form-group">
                    <label>Spender Address:</label>
                    <input
                      type="text"
                      value={approveSpender}
                      onChange={(e) => setApproveSpender(e.target.value)}
                      placeholder="0x..."
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Số lượng:</label>
                    <input
                      type="number"
                      value={approveAmount}
                      onChange={(e) => setApproveAmount(e.target.value)}
                      placeholder="100"
                      step="any"
                      min="0"
                      required
                    />
                  </div>
                  <button type="submit" className="submit-btn">Approve</button>
                </form>
              )}

              {/* Transfer Tab */}
              {activeTab === 'transfer' && (
                <form onSubmit={handleTransfer}>
                  <h2>💸 Transfer Token</h2>
                  <div className="form-group">
                    <label>Địa chỉ nhận:</label>
                    <input
                      type="text"
                      value={transferTo}
                      onChange={(e) => setTransferTo(e.target.value)}
                      placeholder="0x..."
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Số lượng:</label>
                    <input
                      type="number"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      placeholder="100"
                      step="any"
                      min="0"
                      required
                    />
                  </div>
                  <button type="submit" className="submit-btn">Chuyển Token</button>
                </form>
              )}

              {/* TransferFrom Tab */}
              {activeTab === 'transferFrom' && (
                <form onSubmit={handleTransferFrom}>
                  <h2>🔄 TransferFrom</h2>
                  <div className="info-box">
                    ℹ️ Bạn cần có allowance từ owner để thực hiện transferFrom
                  </div>
                  <div className="form-group">
                    <label>Từ địa chỉ (Owner):</label>
                    <input
                      type="text"
                      value={transferFromOwner}
                      onChange={(e) => setTransferFromOwner(e.target.value)}
                      placeholder="0x..."
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Đến địa chỉ (Recipient):</label>
                    <input
                      type="text"
                      value={transferFromTo}
                      onChange={(e) => setTransferFromTo(e.target.value)}
                      placeholder="0x..."
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Số lượng:</label>
                    <input
                      type="number"
                      value={transferFromAmount}
                      onChange={(e) => setTransferFromAmount(e.target.value)}
                      placeholder="100"
                      step="any"
                      min="0"
                      required
                    />
                  </div>
                  <button type="submit" className="submit-btn">TransferFrom</button>
                </form>
              )}

              {/* Check Tab */}
              {activeTab === 'check' && (
                <div>
                  <h2>🔍 Kiểm tra</h2>
                  
                  <form onSubmit={handleCheckAllowance} className="check-form">
                    <h3>Check Allowance</h3>
                    <div className="form-group">
                      <label>Owner Address:</label>
                      <input
                        type="text"
                        value={checkAllowanceOwner}
                        onChange={(e) => setCheckAllowanceOwner(e.target.value)}
                        placeholder="0x..."
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Spender Address:</label>
                      <input
                        type="text"
                        value={checkAllowanceSpender}
                        onChange={(e) => setCheckAllowanceSpender(e.target.value)}
                        placeholder="0x..."
                        required
                      />
                    </div>
                    <button type="submit" className="submit-btn">Kiểm tra Allowance</button>
                    {allowanceResult && (
                      <div className="result-box">
                        <strong>Allowance:</strong> {allowanceResult}
                      </div>
                    )}
                  </form>

                  <hr />

                  <form onSubmit={handleCheckBalance} className="check-form">
                    <h3>Check Balance</h3>
                    <div className="form-group">
                      <label>Address:</label>
                      <input
                        type="text"
                        value={checkBalanceAddress}
                        onChange={(e) => setCheckBalanceAddress(e.target.value)}
                        placeholder="0x..."
                        required
                      />
                    </div>
                    <button type="submit" className="submit-btn">Kiểm tra Balance</button>
                    {balanceResult && (
                      <div className="result-box">
                        <strong>Balance:</strong> {balanceResult}
                      </div>
                    )}
                  </form>
                </div>
              )}

              {/* History Tab */}
              {activeTab === 'history' && (
                <div>
                  <h2>📜 Lịch Sử Giao Dịch</h2>
                  
                  {/* Transfer History */}
                  <div className="history-section">
                    <h3>🔄 Lịch Sử Transfer</h3>
                    {transferHistory.length === 0 ? (
                      <p className="no-data">Chưa có giao dịch nào</p>
                    ) : (
                      <div className="history-table">
                        <table>
                          <thead>
                            <tr>
                              <th>Loại</th>
                              <th>Từ</th>
                              <th>Đến</th>
                              <th>Số lượng</th>
                              <th>Block</th>
                            </tr>
                          </thead>
                          <tbody>
                            {transferHistory.map((tx, index) => (
                              <tr key={index} className={`tx-${tx.type}`}>
                                <td>
                                  <span className={`badge badge-${tx.type}`}>
                                    {tx.type === 'sent' ? '📤 Gửi' : '📥 Nhận'}
                                  </span>
                                </td>
                                <td className="address-cell" title={tx.from}>
                                  {tx.from.substring(0, 6)}...{tx.from.substring(38)}
                                </td>
                                <td className="address-cell" title={tx.to}>
                                  {tx.to.substring(0, 6)}...{tx.to.substring(38)}
                                </td>
                                <td className="amount-cell">
                                  {parseFloat(tx.amount).toLocaleString()} MTK
                                </td>
                                <td>#{tx.blockNumber}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <hr />

                  {/* Allowance History */}
                  <div className="history-section">
                    <h3>🔓 Lịch Sử Approve</h3>
                    {allowanceHistory.length === 0 ? (
                      <p className="no-data">Chưa có approval nào</p>
                    ) : (
                      <div className="history-table">
                        <table>
                          <thead>
                            <tr>
                              <th>Owner</th>
                              <th>Spender</th>
                              <th>Số lượng cho phép</th>
                              <th>Block</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allowanceHistory.map((approval, index) => (
                              <tr key={index}>
                                <td className="address-cell" title={approval.owner}>
                                  {approval.owner.substring(0, 6)}...{approval.owner.substring(38)}
                                </td>
                                <td className="address-cell" title={approval.spender}>
                                  {approval.spender.substring(0, 6)}...{approval.spender.substring(38)}
                                </td>
                                <td className="amount-cell">
                                  {parseFloat(approval.amount) > 1000000000000 
                                    ? '∞ Unlimited' 
                                    : `${parseFloat(approval.amount).toLocaleString()} MTK`
                                  }
                                </td>
                                <td>#{approval.blockNumber}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div className="refresh-section">
                    <button 
                      onClick={() => {
                        loadTransferHistory(contract, account);
                        loadAllowanceHistory(contract, account);
                        showAlert('✅ Đã làm mới lịch sử', 'success');
                      }} 
                      className="submit-btn"
                    >
                      🔄 Làm mới
                    </button>
                  </div>
                </div>
              )}

              {/* Buy Token Tab */}
              {activeTab === 'buy' && (
                <form onSubmit={handleBuyToken}>
                  <h2>💰 Mua Token</h2>
                  <div className="info-box">
                    ℹ️ Giá hiện tại: 1 MTK = {tokenPrice} ETH
                  </div>
                  
                  <div className="form-group">
                    <label>Số lượng MTK muốn mua:</label>
                    <input
                      type="number"
                      value={buyAmount}
                      onChange={(e) => setBuyAmount(e.target.value)}
                      placeholder="100"
                      step="any"
                      min="0"
                      required
                    />
                  </div>

                  {buyAmount && (
                    <div className="calculation-box">
                      <h3>💵 Chi tiết giao dịch:</h3>
                      <div className="calc-row">
                        <span>Số lượng token:</span>
                        <strong>{parseFloat(buyAmount).toLocaleString()} MTK</strong>
                      </div>
                      <div className="calc-row">
                        <span>Giá:</span>
                        <strong>{tokenPrice} ETH/MTK</strong>
                      </div>
                      <div className="calc-row total">
                        <span>Tổng cần thanh toán:</span>
                        <strong>{(parseFloat(buyAmount) * parseFloat(tokenPrice)).toFixed(6)} ETH</strong>
                      </div>
                    </div>
                  )}

                  <button type="submit" className="submit-btn">Mua Token</button>

                  <div className="info-box" style={{ marginTop: '20px' }}>
                    <strong>Lưu ý:</strong> Đây là demo. Trong thực tế, bạn cần:
                    <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
                      <li>Contract phải có chức năng sale</li>
                      <li>Gửi ETH và nhận MTK tự động</li>
                      <li>Owner phải approve hoặc có liquidity pool</li>
                    </ul>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
