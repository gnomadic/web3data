// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

struct MetadataPayload {
    string verifiableData; // JSON string
    address owner;
    uint256 timestamp;
}

abstract contract VerifiableMetadata is EIP712 {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    string private constant SIGNING_DOMAIN = "Web3Metrics";
    string private constant SIGNATURE_VERSION = "1";

    constructor() EIP712(SIGNING_DOMAIN, SIGNATURE_VERSION) {}

    /**
     * @dev Verifies the input data against the signature
     */
    function verify(
        MetadataPayload memory payload,
        bytes memory signature
    ) public view returns (bool) {
        bytes32 digest = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    keccak256(
                        "MetadataPayload(string verifiableData,address owner,uint256 timestamp)"
                    ),
                    keccak256(bytes(payload.verifiableData)),
                    payload.owner,
                    payload.timestamp
                )
            )
        );

        address signer = ECDSA.recover(digest, signature);
        return signer == getVerifiedSigner();
    }

    /**
     * @dev Hashes the data payload
     */
    function hashPayload(
        string calldata verifiableData,
        address owner,
        uint256 timestamp
    ) public pure returns (bytes32) {
        return
            keccak256(abi.encode(verifiableData, owner, timestamp))
                .toEthSignedMessageHash();
    }

    /**
     * @dev recovers the signature of a data payload
     */
    function recoverSignerAddress(
        bytes32 data,
        bytes memory signature
    ) public pure returns (address) {
        return data.toEthSignedMessageHash().recover(signature);
    }

    /**
     * @dev Virtual function allowing an implementation to set their PUBLIC key
     */
    function getVerifiedSigner() internal view virtual returns (address);

    function getOwner() internal view virtual returns (address);
}
