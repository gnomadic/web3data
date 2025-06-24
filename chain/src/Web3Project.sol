// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IWeb3ProjectFactory} from "./IWeb3ProjectFactory.sol";
import {IWeb3Project} from "./IWeb3Project.sol";
import {console} from "forge-std/console.sol";

contract Web3Project is IWeb3Project {
    address public owner;
    address public projectFactory;

    struct Snapshot {
        string cid;
        uint256 timestamp;
        bytes signature;
    }

    Snapshot[] public metadataSnapshots;
    Snapshot[] public metricsSnapshots;

    event MetadataUpdated(string cid, uint256 timestamp);
    event MetricsUpdated(string cid, uint256 timestamp);

    // error NotVerified();
    // error AlreadyInitialized();

    modifier onlyOwner() {
        require(msg.sender == owner, "Not project owner");
        _;
    }

    function initialize(address _owner, address _factory) external {
        // if (owner != address(0)) revert AlreadyInitialized();
        require(_owner != address(0), "Owner cannot be zero address");
        owner = _owner;

        projectFactory = _factory;
    }

    function initializeWithMetadata(
        address _owner,
        address _factory,
        string memory cid,
        IWeb3ProjectFactory.MetadataPayload memory payload,
        bytes memory signature
    ) external {
        // if (owner != address(0)) revert AlreadyInitialized();
        require(_owner != address(0), "Owner cannot be zero address");
        owner = _owner;
        projectFactory = _factory;

        _updateMetadata(cid, payload, signature);
    }

    function updateMetadata(
        string memory cid,
        IWeb3ProjectFactory.MetadataPayload memory payload,
        bytes memory signature
    ) external onlyOwner {
        _updateMetadata(cid, payload, signature);
    }

    function updateMetrics(
        string memory cid,
        uint256 timestamp,
        bytes memory signature,
        string calldata rawData
    ) external onlyOwner {
        _updateMetrics(cid, timestamp, signature, rawData);
    }

    function _updateMetadata(
        string memory cid,
        IWeb3ProjectFactory.MetadataPayload memory payload,
        bytes memory signature
    ) internal {
        // IWeb3ProjectFactory.MetadataPayload memory payload = IWeb3ProjectFactory
        //     .MetadataPayload({
        //         verifiableData: rawData,
        //         owner: owner,
        //         timestamp: timestamp
        //     });
        console.log(
            "Verifying metadata with payload: %s, %s, %s",
            payload.verifiableData,
            payload.owner,
            payload.timestamp
        );
        bool verified = IWeb3ProjectFactory(projectFactory).verifyMetadata(
            payload,
            signature
        );
        require(verified, "Not verified");

        metadataSnapshots.push(Snapshot(cid, payload.timestamp, signature));
        emit MetadataUpdated(cid, payload.timestamp);
    }

    function _updateMetrics(
        string memory cid,
        uint256 timestamp,
        bytes memory signature,
        string calldata rawData
    ) internal {
        IWeb3ProjectFactory.MetricsPayload memory payload = IWeb3ProjectFactory
            .MetricsPayload({
                verifiableData: rawData,
                owner: owner,
                timestamp: timestamp
            });

        bool verified = IWeb3ProjectFactory(projectFactory).verifyMetrics(
            payload,
            signature
        );
        // ) revert NotVerified();
        require(verified, "Not verified");

        metricsSnapshots.push(Snapshot(cid, timestamp, signature));
        emit MetricsUpdated(cid, timestamp);
    }

    function getLatestMetadata() external view returns (Snapshot memory) {
        return metadataSnapshots[metadataSnapshots.length - 1];
    }

    function getLatestMetrics() external view returns (Snapshot memory) {
        return metricsSnapshots[metricsSnapshots.length - 1];
    }
}
