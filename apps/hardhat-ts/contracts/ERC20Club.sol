pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// DAO with MyToken as a member
contract DAO is Ownable {
    // MyToken token;
    IERC20 token;
    // constructor(MyToken _token) {
    constructor(IERC20 _token) {
        token = _token;
    }
}

