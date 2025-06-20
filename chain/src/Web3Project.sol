// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IWeb3Project} from "./IWeb3Project.sol";

contract Web3Project is IWeb3Project {
    struct Web3MetricsSnapshot {
        bytes32 ipfsHash;
        uint256 timestamp;
        bytes signature;
    }

    address public owner;
    Web3MetricsSnapshot[] public snapshots;

    constructor() {}

    function initialize(address creator) external {
        require(owner == address(0), "Already initialized");
        owner = creator;
    }

    function uploadSnapshot(
        bytes32 ipfsHash,
        uint256 timestamp,
        bytes memory signature
    ) external onlyOwner {
        snapshots.push(Web3MetricsSnapshot(ipfsHash, timestamp, signature));
        emit SnapshotUploaded(ipfsHash, timestamp);
    }

    function getSnapshot(
        uint256 index
    ) external view returns (Web3MetricsSnapshot memory) {
        return snapshots[index];
    }

    function snapshotCount() external view returns (uint256) {
        return snapshots.length;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not project owner");
        _;
    }

    event SnapshotUploaded(bytes32 ipfsHash, uint256 timestamp);
}
