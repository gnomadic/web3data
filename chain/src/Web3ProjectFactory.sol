// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {IWeb3Project} from "./IWeb3Project.sol";
import {IWeb3ProjectFactory} from "./IWeb3ProjectFactory.sol";

contract Web3ProjectFactory is IWeb3ProjectFactory, EIP712, Ownable {
    using ECDSA for bytes32;
    using Clones for address;

    address private verifier;
    address private implementation;
    address[] private projects;

    string private constant SIGNING_DOMAIN = "Web3Metrics";
    string private constant SIGNATURE_VERSION = "1";

    bytes32 private constant METADATA_TYPEHASH =
        keccak256(
            "MetadataPayload(string verifiableData,address owner,uint256 timestamp)"
        );
    bytes32 private constant METRICS_TYPEHASH =
        keccak256(
            "MetricsPayload(string verifiableData,address owner,uint256 timestamp)"
        );

    constructor(
        address _implementation,
        address _verifier
    ) EIP712(SIGNING_DOMAIN, SIGNATURE_VERSION) Ownable(_msgSender()) {
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
        string memory metadataCID,
        MetadataPayload memory payload,
        bytes memory signature
    ) external returns (address) {
        address proxy = implementation.clone();

        projects.push(proxy);

        IWeb3Project(proxy).initializeWithMetadata(
            _msgSender(),
            address(this),
            metadataCID,
            payload,
            signature
        );

        emit ProjectCreated(_msgSender());
        return proxy;
    }

    struct ProjectWithMetadata {
        address projectAddress;
        string metadataCID;
        uint256 timestamp;
    }

    function getProjects(
        uint256 page,
        uint256 pageSize
    ) external view returns (ProjectWithMetadata[] memory) {
        uint256 start = page * pageSize;
        uint256 end = start + pageSize > projects.length
            ? projects.length
            : start + pageSize;

        ProjectWithMetadata[] memory result = new ProjectWithMetadata[](
            end - start
        );

        for (uint256 i = start; i < end; i++) {
            IWeb3Project.Snapshot memory snapshot = IWeb3Project(projects[i])
                .getLatestMetadata();
            result[i - start] = ProjectWithMetadata({
                projectAddress: projects[i],
                metadataCID: snapshot.cid,
                timestamp: snapshot.timestamp
            });
        }

        return result;
    }

    function getVerifier() external view returns (address) {
        return verifier;
    }

    // function debugVerify(
    //     string memory verifiableData,
    //     address owner,
    //     uint256 timestamp,
    //     bytes memory signature
    // ) public view returns (bool) {
    //     bytes32 digest = _hashTypedDataV4(
    //         keccak256(
    //             abi.encode(
    //                 METADATA_TYPEHASH,
    //                 keccak256(bytes(verifiableData)),
    //                 owner,
    //                 timestamp
    //             )
    //         )
    //     );
    //     return ECDSA.recover(digest, signature) == verifier;
    // }

    function verifyMetadata(
        MetadataPayload memory payload,
        bytes memory signature
    ) public view returns (bool) {
        bytes32 digest = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    METADATA_TYPEHASH,
                    keccak256(bytes(payload.verifiableData)),
                    payload.owner,
                    payload.timestamp
                )
            )
        );
        return ECDSA.recover(digest, signature) == verifier;
    }

    function verifyMetrics(
        MetricsPayload memory payload,
        bytes memory signature
    ) public view returns (bool) {
        bytes32 digest = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    METRICS_TYPEHASH,
                    keccak256(bytes(payload.verifiableData)),
                    payload.owner,
                    payload.timestamp
                )
            )
        );
        return ECDSA.recover(digest, signature) == verifier;
    }

    function updateVerifier(address newVerifier) external onlyOwner {
        verifier = newVerifier;
    }

    function updateImplementation(
        address newImplementation
    ) external onlyOwner {
        implementation = newImplementation;
    }

    event ProjectCreated(address indexed owner);
}
