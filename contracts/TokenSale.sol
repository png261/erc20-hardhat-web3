// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenSale is Ownable {
    IERC20 public token;
    uint256 public tokenPrice; // Price in wei per token (with decimals)
    uint256 public tokensSold;

    event TokensPurchased(
        address indexed buyer,
        uint256 amount,
        uint256 cost
    );

    event PriceUpdated(uint256 oldPrice, uint256 newPrice);

    constructor(address _token, uint256 _tokenPrice) Ownable(msg.sender) {
        token = IERC20(_token);
        tokenPrice = _tokenPrice;
    }

    /**
     * @dev Buy tokens by sending ETH
     * @param tokenAmount Amount of tokens to buy (in wei, 18 decimals)
     */
    function buyTokens(uint256 tokenAmount) public payable {
        require(tokenAmount > 0, "Token amount must be greater than 0");
        
        // Calculate cost in ETH
        uint256 cost = (tokenAmount * tokenPrice) / 1e18;
        require(msg.value >= cost, "Insufficient ETH sent");

        // Check contract has enough tokens
        uint256 contractBalance = token.balanceOf(address(this));
        require(contractBalance >= tokenAmount, "Not enough tokens in contract");

        // Transfer tokens to buyer
        require(token.transfer(msg.sender, tokenAmount), "Token transfer failed");

        tokensSold += tokenAmount;

        // Refund excess ETH
        if (msg.value > cost) {
            payable(msg.sender).transfer(msg.value - cost);
        }

        emit TokensPurchased(msg.sender, tokenAmount, cost);
    }

    /**
     * @dev Calculate cost for a given token amount
     * @param tokenAmount Amount of tokens (in wei, 18 decimals)
     * @return cost in ETH (wei)
     */
    function calculateCost(uint256 tokenAmount) public view returns (uint256) {
        return (tokenAmount * tokenPrice) / 1e18;
    }

    /**
     * @dev Update token price (only owner)
     * @param newPrice New price in wei per token
     */
    function updatePrice(uint256 newPrice) public onlyOwner {
        require(newPrice > 0, "Price must be greater than 0");
        uint256 oldPrice = tokenPrice;
        tokenPrice = newPrice;
        emit PriceUpdated(oldPrice, newPrice);
    }

    /**
     * @dev Withdraw ETH from contract (only owner)
     */
    function withdrawETH() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        payable(owner()).transfer(balance);
    }

    /**
     * @dev Withdraw unsold tokens (only owner)
     * @param amount Amount of tokens to withdraw
     */
    function withdrawTokens(uint256 amount) public onlyOwner {
        require(token.transfer(owner(), amount), "Token transfer failed");
    }

    /**
     * @dev Get contract's token balance
     */
    function getTokenBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    /**
     * @dev Get contract's ETH balance
     */
    function getETHBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
