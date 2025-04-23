// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

//take the recently deployed contract and fund our contract with ether
//withdraw

import {Script} from "lib/forge-std/src/Script.sol";
import {DevOpsTools} from "lib/foundry-devops/src/DevOpsTools.sol"; //used to get the most recently deployed script
import {FundMe} from "../src/FundMe.sol";

contract FundFundMe is Script {
    uint256 SEND_VALUE = 0.1 ether;

    function fundFundMe(address mostRecentlyDeployed) public {
        //to run this function we use the command forge script script /Interactions.s.sol:fundFundMe --rpc-url   --private-key
        vm.startBroadcast();
        FundMe(payable(mostRecentlyDeployed)).fund{value: SEND_VALUE}(); //We have to typecast it as payable as we are sending money in here
        vm.stopBroadcast();
        // console.log("Funded FundMe with %s", SEND_VALUE);
    }

    function run() external {
        address mostRecentlyDeployed = DevOpsTools.get_most_recent_deployment(
            "FundMe",
            block.chainid
        ); //Gives the latest deployed contract of FundMe
        fundFundMe(mostRecentlyDeployed);
    }
}

contract WithdrawFundMe is Script {
    function withdrawFundMe(address mostRecentlyDeployed) public {
        vm.startBroadcast();
        FundMe(payable(mostRecentlyDeployed)).withdraw();
        vm.stopBroadcast();
        //console.log("Withdraw FundMe balance!");
    }

    function run() external {
        //This function runs first
        address mostRecentlyDeployed = DevOpsTools.get_most_recent_deployment(
            "FundMe",
            block.chainid
        );
        withdrawFundMe(mostRecentlyDeployed);
    }
}
