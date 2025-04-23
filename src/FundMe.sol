// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

//To use chainlinks we need to install smartcontractkit/chainlink-brownie-contract(find this in github repo of the course) using command forge install path --no-commit

import {AggregatorV3Interface} from "lib/chainlink-brownie-contracts/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {PriceConverter} from "./PriceConverter.sol";

error FundMe__NotOwner();

contract FundMe {
    using PriceConverter for uint256;

    mapping(address => uint256) public s_addressToAmountFunded;
    address[] public s_funders;

    
    address public /* immutable */ i_owner;
    uint256 public constant MINIMUM_USD = 5 * 10 ** 18;
    AggregatorV3Interface public s_priceFeed;
    
    constructor(address priceFeed) {
        i_owner = msg.sender;
        s_priceFeed=AggregatorV3Interface(priceFeed);
        

    }

    function fund() public payable {
        require(msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD, "You need to spend more ETH!");
        // require(PriceConverter.getConversionRate(msg.value) >= MINIMUM_USD, "You need to spend more ETH!");
        s_addressToAmountFunded[msg.sender] += msg.value;
        s_funders.push(msg.sender);
    }
    
    
    function getVersion() public view returns (uint256){
        
        return s_priceFeed.version();
    }
    
    modifier onlyOwner {
        // require(msg.sender == owner);
        if (msg.sender != i_owner) revert FundMe__NotOwner();
        _;
    }

    
    function withdraw() public onlyOwner {
        for (uint256 funderIndex=0; funderIndex < s_funders.length; funderIndex++){
            address funder = s_funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
       
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }

     function transferEther() public payable {
        // Check if the contract has enough balance to perform the transfer
        require(address(this).balance >= msg.value, "Insufficient balance in the contract");
        
        // Transfer the Ether to the sender's address
        (bool success, ) = msg.sender.call{value: msg.value}("");
        require(success, "Transfer failed");
    }

    function sendEther(address payable recipient, uint256 amount) public{
        require(address(this).balance >= amount, "Insufficient balance in the contract");
        recipient.transfer(amount);
    }
    

    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }

     function getAddressToAmountFunded(address fundingAddress) public view returns (uint256) {
        return s_addressToAmountFunded[fundingAddress];
    }

     function getFunder(uint256 index) public view returns (address) {
        return s_funders[index];
    }

    function getOwner()external view returns(address){
        return i_owner;
    }

}

//payable keyword is used to make the function send and recieve money
//1e18 is equal to one eth
//revert undos the action of all the lines of the function above it if the condition is not satisfied
//msg.value considers the input given by the user
//there are 18 decimal places 
//msg.sender the guy who puts in the input
//library
//using PriceConverter for uint256;This lines says any value of type uint256 can call the library functions like msg.value.getconversionrate()
//constructor runs when the contract is deployed so in this case when the contract is deployed msg.sender is the deployer and this becomes owner of the contract and thus only he can withdraw the funds
//using error functions saves gas along with using keywords like constant and immutable
//recieve function is used when somebody wants to directly send money to contract without data whereas fallback is used when somebody wants to send money with data

//to install chainlink brownie second video 8:27