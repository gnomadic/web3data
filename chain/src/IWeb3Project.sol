// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IWeb3ProjectFactory} from "./IWeb3ProjectFactory.sol";

interface IWeb3Project {
    function initialize(address _owner, address _factory) external;

    function initializeWithMetadata(
        address _owner,
        address _factory,
        string memory cid,
        IWeb3ProjectFactory.MetadataPayload memory payload,
        bytes memory signature
    ) external;
}
