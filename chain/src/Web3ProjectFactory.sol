// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Web3ProjectFactory is Ownable {
    using Clones for address;

    address public immutable implementation;

    address[] public projects;

    constructor(address _implementation) Ownable(_msgSender()) {
        require(
            _implementation != address(0),
            "Implementation address cannot be zero"
        );
        implementation = _implementation;
    }

    function createProject() external returns (address) {
        address proxy = implementation.clone();

        IWeb3Project(proxy).initialize(_msgSender());

        emit ProjectCreated(_msgSender());
        return proxy;
    }

    event ProjectCreated(address indexed owner);
}
