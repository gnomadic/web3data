// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract EIP712MetadataVerifier is EIP712 {
    using ECDSA for bytes32;

    address public immutable trustedSigner;

    struct MetadataPayload {
        string verifiableJSONData; // JSON string
        address owner;
        uint256 timestamp;
    }

    bytes32 private constant METADATA_TYPEHASH =
        keccak256(
            "MetadataPayload(string verifiableJSONData,address owner,uint256 timestamp)"
        );

    constructor(address _trustedSigner) EIP712("Web3Metadata", "1") {
        trustedSigner = _trustedSigner;
    }

    function verify(
        MetadataPayload calldata payload,
        bytes calldata signature
    ) external view returns (bool) {
        bytes32 digest = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    METADATA_TYPEHASH,
                    keccak256(bytes(payload.verifiableJSONData)),
                    payload.owner,
                    payload.timestamp
                )
            )
        );

        address recovered = ECDSA.recover(digest, signature);
        return recovered == trustedSigner;
    }

    function getDigest(
        MetadataPayload calldata payload
    ) external view returns (bytes32) {
        return
            _hashTypedDataV4(
                keccak256(
                    abi.encode(
                        METADATA_TYPEHASH,
                        keccak256(bytes(payload.verifiableJSONData)),
                        payload.owner,
                        payload.timestamp
                    )
                )
            );
    }
}
