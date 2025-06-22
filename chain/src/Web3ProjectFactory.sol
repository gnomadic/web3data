// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import {IWeb3Project} from "./Web3Project.sol";

struct MetadataPayload {
    string verifiableData; // JSON string
    address owner;
    uint256 timestamp;
}

interface IWeb3ProjectFactory {
    function getVerifier() external view returns (address);

    function verifyMetadata(
        MetadataPayload memory payload,
        bytes memory signature
    ) external view returns (bool);
}

contract Web3ProjectFactory is Ownable, IWeb3ProjectFactory, EIP712 {
    using Clones for address;
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    address public verifier;
    address public immutable implementation;
    address[] public projects;

    string private constant SIGNING_DOMAIN = "Web3Metrics";
    string private constant SIGNATURE_VERSION = "1";
    bytes private constant METADATA_PAYLOAD =
        "MetadataPayload(string verifiableData,address owner,uint256 timestamp)";

    constructor(
        address _implementation,
        address _verifier
    ) Ownable(_msgSender()) EIP712(SIGNING_DOMAIN, SIGNATURE_VERSION) {
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
        string memory metadataCID,
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

    function verifyMetadata(
        MetadataPayload memory payload,
        bytes memory signature
    ) public view returns (bool) {
        IWeb3Project project = IWeb3Project(msg.sender);

        // require(
        //     project.getOwner() == msg.sender,
        //     "Payload owner does not match project owner"
        // );

        return verify(METADATA_PAYLOAD, payload, signature);
    }

    function verify(
        bytes memory payloadType,
        MetadataPayload memory payload,
        bytes memory signature
    ) internal view returns (bool) {
        bytes32 digest = createDigest(payloadType, payload);

        address signer = ECDSA.recover(digest, signature);
        return signer == verifier;
    }

    function createDigest(
        bytes memory payloadType,
        MetadataPayload memory payload
    ) public view returns (bytes32) {
        return
            _hashTypedDataV4(
                keccak256(
                    abi.encode(
                        keccak256(payloadType),
                        keccak256(bytes(payload.verifiableData)),
                        payload.owner,
                        payload.timestamp
                    )
                )
            );
    }

    function recoverSigner(
        MetadataPayload memory payload,
        bytes memory signature
    ) public view returns (address) {
        bytes32 digest = createDigest(METADATA_PAYLOAD, payload);
        return ECDSA.recover(digest, signature);
    }

    // function debugVerify(
    //     MetadataPayload memory payload,
    //     bytes memory signature
    // ) public view returns (address) {
    //     bytes32 digest = _hashTypedDataV4(
    //         keccak256(
    //             abi.encode(
    //                 keccak256(METADATA_PAYLOAD),
    //                 keccak256(bytes(payload.verifiableData)),
    //                 payload.owner,
    //                 payload.timestamp
    //             )
    //         )
    //     );

    //     address signer = ECDSA.recover(digest, signature);
    //     return signer;
    // }

    // function digest(
    //     MetadataPayload memory payload,
    //     bytes memory signature
    // ) public view returns (bytes32) {
    //     return
    //         _hashTypedDataV4(
    //             keccak256(
    //                 abi.encode(
    //                     keccak256(METADATA_PAYLOAD),
    //                     keccak256(bytes(payload.verifiableData)),
    //                     payload.owner,
    //                     payload.timestamp
    //                 )
    //             )
    //         );
    // }

    // function debugDigest(
    //     uint256 timestamp,
    //     bytes memory signature,
    //     string calldata input
    // ) public view returns (bytes32) {
    //     return digest(MetadataPayload(input, msg.sender, timestamp), signature);
    // }

    // function debugUpdateMetadata(
    //     uint256 timestamp,
    //     bytes memory signature,
    //     string calldata input
    // ) public onlyOwner returns (bool) {
    //     return
    //         verifyMetadata(
    //             MetadataPayload(input, msg.sender, timestamp),
    //             signature
    //         );
    // }

    event ProjectCreated(address indexed owner);
}
