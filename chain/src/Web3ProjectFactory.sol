// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {IWeb3Project} from "./IWeb3Project.sol";

interface IWeb3ProjectFactory {
    function getVerifier() external view returns (address);
}

contract Web3ProjectFactory is Ownable, IWeb3ProjectFactory {
    using Clones for address;

    address public verifier;
    address public immutable implementation;
    address[] public projects;

    constructor(
        address _implementation,
        address _verifier
    ) Ownable(_msgSender()) {
        require(
            _implementation != address(0),
            "Implementation address cannot be zero"
        );
        implementation = _implementation;
        verifier = _verifier;
    }

    function createProject() external returns (address) {
        address proxy = implementation.clone();

        projects.push(proxy);

        IWeb3Project(proxy).initialize(_msgSender(), address(this));

        emit ProjectCreated(_msgSender());
        return proxy;
    }

    function createProjectWithMetadata(
        bytes32 metadataCID,
        uint256 timestamp,
        bytes memory signature,
        string calldata input
    ) external returns (address) {
        address proxy = implementation.clone();

        projects.push(proxy);

        IWeb3Project(proxy).initializeWithMetadata(
            _msgSender(),
            address(this),
            metadataCID,
            timestamp,
            signature,
            input
        );

        emit ProjectCreated(_msgSender());
        return proxy;
    }

    function getProjects() external view returns (address[] memory) {
        return projects;
    }

    function getVerifier() external view returns (address) {
        return verifier;
    }

    event ProjectCreated(address indexed owner);
}
