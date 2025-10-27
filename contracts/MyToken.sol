// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MyToken
 * @dev ERC20 Token với tính năng approve để cho phép các address khác sử dụng token
 */
contract MyToken is ERC20, Ownable {
    
    // Event khi approve thành công
    event TokensApproved(address indexed owner, address indexed spender, uint256 amount);
    
    /**
     * @dev Constructor khởi tạo token với tên và symbol
     * @param initialSupply Số lượng token ban đầu (sẽ được mint cho deployer)
     */
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
    
    /**
     * @dev Mint thêm token (chỉ owner)
     * @param to Address nhận token
     * @param amount Số lượng token cần mint
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
    /**
     * @dev Approve cho phép một address khác sử dụng token của bạn
     * @param spender Address được phép sử dụng token
     * @param amount Số lượng token được phép sử dụng
     * @return bool Trả về true nếu thành công
     */
    function approveTokens(address spender, uint256 amount) public returns (bool) {
        approve(spender, amount);
        emit TokensApproved(msg.sender, spender, amount);
        return true;
    }
    
    /**
     * @dev Kiểm tra số lượng token được approve
     * @param owner Address chủ sở hữu token
     * @param spender Address được phép sử dụng
     * @return uint256 Số lượng token được approve
     */
    function getAllowance(address owner, address spender) public view returns (uint256) {
        return allowance(owner, spender);
    }
}
