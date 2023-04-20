pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("My Token", "ERC20CLUB") {
        _mint(msg.sender, initialSupply);
    }
    // solidity function to mint tokens to msg.owner
    function mint(uint256 amount) public {
        _mint(msg.sender, amount);
    }
}
