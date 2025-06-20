// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Counter} from "../src/Counter.sol";
import {Web3ProjectFactory} from "../src/Web3ProjectFactory.sol";
import {Web3Project} from "../src/Web3Project.sol";

contract Web3MetricsScript is Script {
    Web3ProjectFactory public web3ProjectFactory;
    Web3Project public web3Project;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        web3Project = new Web3Project();

        web3ProjectFactory = new Web3ProjectFactory(address(web3Project));

        // web3ProjectFactory.createProject();

        console.log(
            "Web3ProjectFactory deployed at: %s",
            address(web3ProjectFactory)
        );

        vm.stopBroadcast();

        // Format output
        string memory chainIdStr = vm.toString(block.chainid);
        // string memory outputPath = string.concat("./web3deploy.json");
        string memory outputPath = "./deployments/web3deploy.json";

        console.log("outputPath: %s", outputPath);

        string memory object1 = "deploy key";
        string memory web3factory = vm.serializeString(
            object1,
            "Web3ProjectFactory",
            vm.toString(address(web3ProjectFactory))
        );

        console.log("JSON output: %s", web3factory);

        vm.writeJson(web3factory, outputPath);
    }
}
