pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EnvirosAgroCoin is ERC20 {
    address public owner;

    constructor() ERC20("EnvirosAgro Coin", "EAC") {
        owner = msg.sender;
    }

    function mint(address to, uint256 amount) public {
        require(msg.sender == owner, "Only the owner can mint new coins");
        _mint(to, amount);
    }
}
