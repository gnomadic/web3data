// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IWeb3ProjectFactory {
    function getVerifier() external view returns (address);

    function verifyMetadata(
        MetadataPayload memory,
        bytes memory
    ) external view returns (bool);

    function verifyMetrics(
        MetricsPayload memory,
        bytes memory
    ) external view returns (bool);

    struct MetadataPayload {
        string verifiableData;
        address owner;
        uint256 timestamp;
    }

    struct MetricsPayload {
        string verifiableData;
        address owner;
        uint256 timestamp;
    }
}
