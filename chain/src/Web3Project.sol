// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IWeb3Project} from "./IWeb3Project.sol";
import {MetadataPayload, VerifiableMetadata} from "./VerifiableMetadata.sol";
import {IWeb3ProjectFactory} from "./Web3ProjectFactory.sol";

struct Web3MetricsSnapshot {
    bytes32 metricsCID;
    uint256 timestamp;
    bytes signature;
}

struct Web3ProjectSnapshot {
    bytes32 metadataCID;
    uint256 timestamp;
    bytes signature;
}

contract Web3Project is IWeb3Project, VerifiableMetadata {
    address public owner;
    address private factory;

    Web3MetricsSnapshot[] public metricsSnapshots;
    Web3ProjectSnapshot[] public projectSnapshots;

    constructor() {}

    function initialize(address _owner, address _factory) external {
        require(owner == address(0), "Already initialized");
        owner = _owner;
        factory = _factory;
    }

    function initializeWithMetadata(
        address _owner,
        address _factory,
        bytes32 metadataCID,
        uint256 timestamp,
        bytes memory signature,
        string calldata input
    ) external {
        require(owner == address(0), "Already initialized");
        owner = _owner;
        factory = _factory;

        updateMetadata(metadataCID, timestamp, signature, input);
    }

    function updateMetrics(
        bytes32 metricsCID,
        uint256 timestamp,
        bytes memory signature,
        string calldata input
    ) public onlyOwner {
        if (!verify(MetadataPayload(input, msg.sender, timestamp), signature)) {
            revert NOT_VERIFIED();
        }

        metricsSnapshots.push(
            Web3MetricsSnapshot(metricsCID, timestamp, signature)
        );
        emit MetricsUpdated(metricsCID, timestamp);
    }

    function updateMetadata(
        bytes32 metadataCID,
        uint256 timestamp,
        bytes memory signature,
        string calldata input
    ) public onlyOwner {
        if (!verify(MetadataPayload(input, msg.sender, timestamp), signature)) {
            revert NOT_VERIFIED();
        }

        projectSnapshots.push(
            Web3ProjectSnapshot(metadataCID, timestamp, signature)
        );
        emit MetadataUpdated(metadataCID, timestamp);
    }

    function getLatestMetrics()
        external
        view
        returns (Web3MetricsSnapshot memory)
    {
        if (metricsSnapshots.length == 0) {
            revert NO_DATA();
        }
        return metricsSnapshots[metricsSnapshots.length - 1];
    }

    function getLatestMetadata()
        external
        view
        returns (Web3ProjectSnapshot memory)
    {
        if (projectSnapshots.length == 0) {
            revert NO_DATA();
        }
        return projectSnapshots[projectSnapshots.length - 1];
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not project owner");
        _;
    }

    function getVerifiedSigner() internal view override returns (address) {
        return IWeb3ProjectFactory(factory).getVerifier();
    }

    function getOwner() internal view override returns (address) {
        return owner;
    }

    event MetadataUpdated(bytes32 metadataID, uint256 timestamp);
    event MetricsUpdated(bytes32 metricsID, uint256 timestamp);

    error NOT_VERIFIED();
    error NO_DATA();
}
