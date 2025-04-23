//to deploy we use command forge script sript/filename.s.sol

// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import {Script} from "lib/forge-std/src/Script.sol";//mandatory to use this
import {FundMe} from "../src/FundMe.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployFundMe is Script {
    function run() external returns (FundMe, HelperConfig) {
        HelperConfig helperConfig = new HelperConfig(); // This comes with our mocks!
        address priceFeed = helperConfig.activeNetworkConfig();

        vm.startBroadcast();
        FundMe fundMe = new FundMe(priceFeed);
        vm.stopBroadcast();
        return (fundMe, helperConfig);
    }
}