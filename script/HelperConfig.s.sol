
// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import {Script} from "lib/forge-std/src/Script.sol";
import {MockV3Aggregator} from "../test/Mocks/MockV3Aggregator.sol";

contract HelperConfig is Script{
    

     uint8 public constant DECIMALS = 8;
    int256 public constant INITIAL_PRICE = 2000e8;

    struct NetworkConfig {
        address priceFeed;
    }

    NetworkConfig public activeNetworkConfig;

    constructor(){
        if(block.chainid==11155111){//Every bloackchain network has its unique chain id ,this block.chainid is known by the rpc url that we pass during test or deployment
            activeNetworkConfig=getSepoliaEthConfig();
        }
        else if(block.chainid==1){
            activeNetworkConfig=getMainNetEthConfig();
        }
        else{
            activeNetworkConfig=getOrCreateAnvilEthConfig();
        }
    }

    function getSepoliaEthConfig()public pure returns (NetworkConfig memory){//we use memory keyword as this is a special object
        NetworkConfig memory sepoliaConfig=NetworkConfig({priceFeed:0x694AA1769357215DE4FAC081bf1f309aDC325306});
        return sepoliaConfig;
    }

    function getMainNetEthConfig()public pure returns (NetworkConfig memory){
        NetworkConfig memory ethConfig=NetworkConfig({priceFeed:0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419});
        return ethConfig;
    }

     function getOrCreateAnvilEthConfig()public returns (NetworkConfig memory){
        if(activeNetworkConfig.priceFeed!=address(0)){//this line basically stops redeployment of mock contract after once it has been deployed
            return activeNetworkConfig;
        }
        //1) Deploy the mock
        //2)Return the mock address
        vm.broadcast();
        MockV3Aggregator mockPriceFeed=new MockV3Aggregator(DECIMALS,INITIAL_PRICE);//This is similar to the price feed to which we pass address
        //vm.stopBroadcast();

        NetworkConfig memory anvilConfig=NetworkConfig({priceFeed:address(mockPriceFeed)});
        return anvilConfig;
        
    }
}