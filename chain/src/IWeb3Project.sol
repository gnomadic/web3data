// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IWeb3ProjectFactory} from "./IWeb3ProjectFactory.sol";

interface IWeb3Project {
    struct Snapshot {
        string cid;
        uint256 timestamp;
        bytes signature;
    }

    function initialize(address _owner, address _factory) external;

    function initializeWithMetadata(
        address _owner,
        address _factory,
        string memory cid,
        IWeb3ProjectFactory.MetadataPayload memory payload,
        bytes memory signature
    ) external;

    function getLatestMetadata() external view returns (Snapshot memory);
}
