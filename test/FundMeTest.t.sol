

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

//listen here 
//Two times problem has occurred because of not giving the correct path
//As remappings is not working see the proper path from under FOUNDRY-FUND-ME-F3

import {Test,console} from "lib/forge-std/src/Test.sol";
//Mandatory to import for every test file to use commands like assert.eq
import {FundMe} from "../src/FundMe.sol";
import {DeployFundMe} from "../script/DeployFundMe.s.sol";
import {StdCheats} from "forge-std/StdCheats.sol";
import{HelperConfig} from "../script/HelperConfig.s.sol";
//import {HelperConfig} from "../../script/HelperConfig.s.sol";
//console is used to use console.log which is sort of print function
//foundry-23/foundry-fund-me-f23/src/FundMe.sol
contract FundMeTest is Test{

    HelperConfig public helperConfig;

    FundMe fundMe;
    address USER = makeAddr("user");//A new address is created with the name user,Now if we use vm.prank(user) then the next transaction is going to be sent by the user
    uint256 SEND_VALUE=0.1 ether;//100000000000000000
    uint256 STARTING_BALANCE=10 ether;
    uint256 GAS_PRICE=1;


    function setUp() external{//always runs first
       DeployFundMe deployFundMe=new DeployFundMe();
       (fundMe,helperConfig)=deployFundMe.run();
       vm.deal(USER,STARTING_BALANCE);//user address is given starting_balance money
    }
    
    function testMinimumDollarIsFive() public{
        
        assertEq(fundMe.MINIMUM_USD(),5e18);
        
       }

    function testOwnerIsMessageSender() public{
        assertEq(fundMe.i_owner(),msg.sender);
        
    }

    function testPriceFeedVersionIsAccurate() public{ //to check if the pricefeed is setup properly
        uint256 version=fundMe.getVersion();
        assertEq(version,4);
        
    }

    function testFundFailWithoutEnoughEth()public{
        vm.expectRevert();//The next is expected to revert,if it reverts test passes
        fundMe.fund();//By default value is 0 which is less than 5 USD so it reverts

    }
    
    function testFundUpdatesFundedDataStructure() public {
       fundMe.fund{value:SEND_VALUE}();//0.1 eth is sent here
       uint256 amountFunded=fundMe.getAddressToAmountFunded(address(this));//Now if we use vm.prank(user) then the next transaction is going to be sent by the user,so instead of address(this) we will use USER
       assertEq(amountFunded,SEND_VALUE);

    }

    function testAddsFunderToArrayOfFunders() public {
        //vm.startPrank(USER);
        fundMe.fund{value: SEND_VALUE}();//fundMe.fund from previous sections wont count so this is basically a fresh fundme and thus we are looking for address at 0th index
        //vm.stopPrank();

        address funder = fundMe.getFunder(0);
        assertEq(funder, address(this));//here also we can use USER instead of address(this) if we use prank
    }

     function testOnlyOwnerCanWithdraw() public {
      
       fundMe.fund{value: SEND_VALUE}();//We need to fund first as previous fundings wont count
       vm.expectRevert();//Next line should give false so test passes
       //vm.prank(USER);
       fundMe.withdraw();

    }

   
     function testWithdrawFromASingleFunder() public {
        // Arrange
        fundMe.fund{value: SEND_VALUE}();
        uint256 startingFundMeBalance = address(fundMe).balance;
        uint256 startingOwnerBalance = fundMe.getOwner().balance;

        vm.txGasPrice(GAS_PRICE);
        uint256 gasStart = gasleft();
        // // Act
        
        vm.startPrank(fundMe.getOwner());//Anything between startprank and stopprank is done by fundMe.getOwner
        fundMe.withdraw();
        vm.stopPrank();

        uint256 gasEnd = gasleft();
        uint256 gasUsed = (gasStart - gasEnd) * tx.gasprice;

        // Assert
        uint256 endingFundMeBalance = address(fundMe).balance;
        uint256 endingOwnerBalance = fundMe.getOwner().balance;
        assertEq(endingFundMeBalance, 0);
        assertEq(
            startingFundMeBalance + startingOwnerBalance,
            endingOwnerBalance // + gasUsed
        );
    }
      function testWithDrawFromMultipleFunders() public {
        uint160 numberOfFunders = 10;//if we want to generate addresses from numbers like in this case we use uint160
        uint160 startingFunderIndex = 1;//start with 1 as default not 0
        for (uint160 i = startingFunderIndex; i < numberOfFunders + startingFunderIndex; i++) {
            // we get hoax from stdcheats
            // prank + deal
            hoax(address(i), SEND_VALUE);
            fundMe.fund{value: SEND_VALUE}();
        }

        uint256 startingFundMeBalance = address(fundMe).balance;
        uint256 startingOwnerBalance = fundMe.getOwner().balance;

        vm.startPrank(fundMe.getOwner());
        fundMe.withdraw();//Anything between start and stop prank will be pretended to be called by fundme.getOwner()
        vm.stopPrank();

        assert(address(fundMe).balance == 0);
        assert(fundMe.getOwner().balance > startingOwnerBalance);
        assert(numberOfFunders * SEND_VALUE == fundMe.getOwner().balance - startingOwnerBalance);
    }
}

//to run tests specific to sepolia we use forge test --fork-url $SEPOLIA_RPC_URL
//forge coverage --fork-url $SEPOLIA_RPC_URL

