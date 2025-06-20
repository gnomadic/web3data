// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IWeb3Project {
    function initialize(address creator, address factory) external;

    function initializeWithMetadata(
        address _owner,
        address _factory,
        bytes32 metadataCID,
        uint256 timestamp,
        bytes memory signature,
        string calldata input
    ) external;
}
