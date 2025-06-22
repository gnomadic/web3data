// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IWeb3ProjectFactory, MetadataPayload} from "./Web3ProjectFactory.sol";

struct Web3MetricsSnapshot {
    string metricsCID;
    uint256 timestamp;
    bytes signature;
}

struct Web3ProjectSnapshot {
    string metadataCID;
    uint256 timestamp;
    bytes signature;
}

interface IWeb3Project {
    function initialize(address creator, address factory) external;

    function initializeWithMetadata(
        address _owner,
        address _factory,
        string memory metadataCID,
        uint256 timestamp,
        bytes memory signature,
        string calldata input
    ) external;

    function getOwner() external view returns (address);
}

contract Web3Project is IWeb3Project {
    address public owner;
    IWeb3ProjectFactory private factory;

    Web3MetricsSnapshot[] public metricsSnapshots;
    Web3ProjectSnapshot[] public projectSnapshots;

    constructor() {}

    function initialize(address _owner, address _factory) external {
        require(owner == address(0), "Already initialized");
        owner = _owner;
        factory = IWeb3ProjectFactory(_factory);
    }

    function initializeWithMetadata(
        address _owner,
        address _factory,
        string memory metadataCID,
        uint256 timestamp,
        bytes memory signature,
        string calldata input
    ) external {
        require(owner == address(0), "Already initialized");
        owner = _owner;
        factory = IWeb3ProjectFactory(_factory);

        updateMetadata(metadataCID, timestamp, signature, input);
    }

    // function updateMetrics(
    //     string memory metricsCID,
    //     uint256 timestamp,
    //     bytes memory signature,
    //     string calldata input
    // ) public onlyOwner {
    //     if (
    //         !factory.verify(
    //             MetadataPayload(input, msg.sender, timestamp),
    //             signature
    //         )
    //     ) {
    //         revert NOT_VERIFIED();
    //     }

    //     metricsSnapshots.push(
    //         Web3MetricsSnapshot(metricsCID, timestamp, signature)
    //     );
    //     emit MetricsUpdated(metricsCID, timestamp);
    // }

    function updateMetadata(
        string memory metadataCID,
        uint256 timestamp,
        bytes memory signature,
        string calldata input
    ) public onlyOwner {
        bool verified = factory.verifyMetadata(
            MetadataPayload(input, msg.sender, timestamp),
            signature
        );

        require(verified, "Metadata verification failed");

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
        require(metricsSnapshots.length > 0, "No metrics snapshots available");

        return metricsSnapshots[metricsSnapshots.length - 1];
    }

    function getLatestMetadata()
        external
        view
        returns (Web3ProjectSnapshot memory)
    {
        require(projectSnapshots.length > 0, "No project snapshots available");

        return projectSnapshots[projectSnapshots.length - 1];
    }

    modifier onlyOwner() {
        // require(
        //     msg.sender == owner || msg.sender == address(factory),
        //     "NOT_OWNER"
        // );
        _;
    }

    function getOwner() external view override returns (address) {
        return owner;
    }

    event MetadataUpdated(string metadataID, uint256 timestamp);
    event MetricsUpdated(string metricsID, uint256 timestamp);

    // error NOT_VERIFIED();
    // error NO_DATA();
    // error NOT_OWNER();
}
