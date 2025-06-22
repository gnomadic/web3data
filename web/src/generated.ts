import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IWeb3Project
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iWeb3ProjectAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'getOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'creator', internalType: 'address', type: 'address' },
      { name: 'factory', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_factory', internalType: 'address', type: 'address' },
      { name: 'metadataCID', internalType: 'string', type: 'string' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
      { name: 'input', internalType: 'string', type: 'string' },
    ],
    name: 'initializeWithMetadata',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IWeb3ProjectFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iWeb3ProjectFactoryAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'getVerifier',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'payload',
        internalType: 'struct MetadataPayload',
        type: 'tuple',
        components: [
          { name: 'verifiableData', internalType: 'string', type: 'string' },
          { name: 'owner', internalType: 'address', type: 'address' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'verifyMetadata',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Web3Project
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const web3ProjectAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'getLatestMetadata',
    outputs: [
      {
        name: '',
        internalType: 'struct Web3ProjectSnapshot',
        type: 'tuple',
        components: [
          { name: 'metadataCID', internalType: 'string', type: 'string' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLatestMetrics',
    outputs: [
      {
        name: '',
        internalType: 'struct Web3MetricsSnapshot',
        type: 'tuple',
        components: [
          { name: 'metricsCID', internalType: 'string', type: 'string' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_factory', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_factory', internalType: 'address', type: 'address' },
      { name: 'metadataCID', internalType: 'string', type: 'string' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
      { name: 'input', internalType: 'string', type: 'string' },
    ],
    name: 'initializeWithMetadata',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'metricsSnapshots',
    outputs: [
      { name: 'metricsCID', internalType: 'string', type: 'string' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'projectSnapshots',
    outputs: [
      { name: 'metadataCID', internalType: 'string', type: 'string' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'metadataCID', internalType: 'string', type: 'string' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
      { name: 'input', internalType: 'string', type: 'string' },
    ],
    name: 'updateMetadata',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'metadataID',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MetadataUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'metricsID',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MetricsUpdated',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Web3ProjectFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const web3ProjectFactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_implementation', internalType: 'address', type: 'address' },
      { name: '_verifier', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'payloadType', internalType: 'bytes', type: 'bytes' },
      {
        name: 'payload',
        internalType: 'struct MetadataPayload',
        type: 'tuple',
        components: [
          { name: 'verifiableData', internalType: 'string', type: 'string' },
          { name: 'owner', internalType: 'address', type: 'address' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'createDigest',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'createProject',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'metadataCID', internalType: 'string', type: 'string' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
      { name: 'input', internalType: 'string', type: 'string' },
    ],
    name: 'createProjectWithMetadata',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getProjects',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getVerifier',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'implementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'projects',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'payload',
        internalType: 'struct MetadataPayload',
        type: 'tuple',
        components: [
          { name: 'verifiableData', internalType: 'string', type: 'string' },
          { name: 'owner', internalType: 'address', type: 'address' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'recoverSigner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'verifier',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'payload',
        internalType: 'struct MetadataPayload',
        type: 'tuple',
        components: [
          { name: 'verifiableData', internalType: 'string', type: 'string' },
          { name: 'owner', internalType: 'address', type: 'address' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'verifyMetadata',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'ProjectCreated',
  },
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength',
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS',
  },
  { type: 'error', inputs: [], name: 'FailedDeployment' },
  {
    type: 'error',
    inputs: [
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'InvalidShortString' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [{ name: 'str', internalType: 'string', type: 'string' }],
    name: 'StringTooLong',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iWeb3ProjectAbi}__
 */
export const useReadIWeb3Project = /*#__PURE__*/ createUseReadContract({
  abi: iWeb3ProjectAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iWeb3ProjectAbi}__ and `functionName` set to `"getOwner"`
 */
export const useReadIWeb3ProjectGetOwner = /*#__PURE__*/ createUseReadContract({
  abi: iWeb3ProjectAbi,
  functionName: 'getOwner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iWeb3ProjectAbi}__
 */
export const useWriteIWeb3Project = /*#__PURE__*/ createUseWriteContract({
  abi: iWeb3ProjectAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iWeb3ProjectAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteIWeb3ProjectInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: iWeb3ProjectAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iWeb3ProjectAbi}__ and `functionName` set to `"initializeWithMetadata"`
 */
export const useWriteIWeb3ProjectInitializeWithMetadata =
  /*#__PURE__*/ createUseWriteContract({
    abi: iWeb3ProjectAbi,
    functionName: 'initializeWithMetadata',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iWeb3ProjectAbi}__
 */
export const useSimulateIWeb3Project = /*#__PURE__*/ createUseSimulateContract({
  abi: iWeb3ProjectAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iWeb3ProjectAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateIWeb3ProjectInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iWeb3ProjectAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iWeb3ProjectAbi}__ and `functionName` set to `"initializeWithMetadata"`
 */
export const useSimulateIWeb3ProjectInitializeWithMetadata =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iWeb3ProjectAbi,
    functionName: 'initializeWithMetadata',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iWeb3ProjectFactoryAbi}__
 */
export const useReadIWeb3ProjectFactory = /*#__PURE__*/ createUseReadContract({
  abi: iWeb3ProjectFactoryAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iWeb3ProjectFactoryAbi}__ and `functionName` set to `"getVerifier"`
 */
export const useReadIWeb3ProjectFactoryGetVerifier =
  /*#__PURE__*/ createUseReadContract({
    abi: iWeb3ProjectFactoryAbi,
    functionName: 'getVerifier',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iWeb3ProjectFactoryAbi}__ and `functionName` set to `"verifyMetadata"`
 */
export const useReadIWeb3ProjectFactoryVerifyMetadata =
  /*#__PURE__*/ createUseReadContract({
    abi: iWeb3ProjectFactoryAbi,
    functionName: 'verifyMetadata',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectAbi}__
 */
export const useReadWeb3Project = /*#__PURE__*/ createUseReadContract({
  abi: web3ProjectAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"getLatestMetadata"`
 */
export const useReadWeb3ProjectGetLatestMetadata =
  /*#__PURE__*/ createUseReadContract({
    abi: web3ProjectAbi,
    functionName: 'getLatestMetadata',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"getLatestMetrics"`
 */
export const useReadWeb3ProjectGetLatestMetrics =
  /*#__PURE__*/ createUseReadContract({
    abi: web3ProjectAbi,
    functionName: 'getLatestMetrics',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"getOwner"`
 */
export const useReadWeb3ProjectGetOwner = /*#__PURE__*/ createUseReadContract({
  abi: web3ProjectAbi,
  functionName: 'getOwner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"metricsSnapshots"`
 */
export const useReadWeb3ProjectMetricsSnapshots =
  /*#__PURE__*/ createUseReadContract({
    abi: web3ProjectAbi,
    functionName: 'metricsSnapshots',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"owner"`
 */
export const useReadWeb3ProjectOwner = /*#__PURE__*/ createUseReadContract({
  abi: web3ProjectAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"projectSnapshots"`
 */
export const useReadWeb3ProjectProjectSnapshots =
  /*#__PURE__*/ createUseReadContract({
    abi: web3ProjectAbi,
    functionName: 'projectSnapshots',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link web3ProjectAbi}__
 */
export const useWriteWeb3Project = /*#__PURE__*/ createUseWriteContract({
  abi: web3ProjectAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteWeb3ProjectInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: web3ProjectAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"initializeWithMetadata"`
 */
export const useWriteWeb3ProjectInitializeWithMetadata =
  /*#__PURE__*/ createUseWriteContract({
    abi: web3ProjectAbi,
    functionName: 'initializeWithMetadata',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"updateMetadata"`
 */
export const useWriteWeb3ProjectUpdateMetadata =
  /*#__PURE__*/ createUseWriteContract({
    abi: web3ProjectAbi,
    functionName: 'updateMetadata',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link web3ProjectAbi}__
 */
export const useSimulateWeb3Project = /*#__PURE__*/ createUseSimulateContract({
  abi: web3ProjectAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateWeb3ProjectInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: web3ProjectAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"initializeWithMetadata"`
 */
export const useSimulateWeb3ProjectInitializeWithMetadata =
  /*#__PURE__*/ createUseSimulateContract({
    abi: web3ProjectAbi,
    functionName: 'initializeWithMetadata',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"updateMetadata"`
 */
export const useSimulateWeb3ProjectUpdateMetadata =
  /*#__PURE__*/ createUseSimulateContract({
    abi: web3ProjectAbi,
    functionName: 'updateMetadata',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link web3ProjectAbi}__
 */
export const useWatchWeb3ProjectEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: web3ProjectAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link web3ProjectAbi}__ and `eventName` set to `"MetadataUpdated"`
 */
export const useWatchWeb3ProjectMetadataUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: web3ProjectAbi,
    eventName: 'MetadataUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link web3ProjectAbi}__ and `eventName` set to `"MetricsUpdated"`
 */
export const useWatchWeb3ProjectMetricsUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: web3ProjectAbi,
    eventName: 'MetricsUpdated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__
 */
export const useReadWeb3ProjectFactory = /*#__PURE__*/ createUseReadContract({
  abi: web3ProjectFactoryAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"createDigest"`
 */
export const useReadWeb3ProjectFactoryCreateDigest =
  /*#__PURE__*/ createUseReadContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'createDigest',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"eip712Domain"`
 */
export const useReadWeb3ProjectFactoryEip712Domain =
  /*#__PURE__*/ createUseReadContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'eip712Domain',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"getProjects"`
 */
export const useReadWeb3ProjectFactoryGetProjects =
  /*#__PURE__*/ createUseReadContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'getProjects',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"getVerifier"`
 */
export const useReadWeb3ProjectFactoryGetVerifier =
  /*#__PURE__*/ createUseReadContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'getVerifier',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"implementation"`
 */
export const useReadWeb3ProjectFactoryImplementation =
  /*#__PURE__*/ createUseReadContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'implementation',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"owner"`
 */
export const useReadWeb3ProjectFactoryOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"projects"`
 */
export const useReadWeb3ProjectFactoryProjects =
  /*#__PURE__*/ createUseReadContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'projects',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"recoverSigner"`
 */
export const useReadWeb3ProjectFactoryRecoverSigner =
  /*#__PURE__*/ createUseReadContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'recoverSigner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"verifier"`
 */
export const useReadWeb3ProjectFactoryVerifier =
  /*#__PURE__*/ createUseReadContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'verifier',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"verifyMetadata"`
 */
export const useReadWeb3ProjectFactoryVerifyMetadata =
  /*#__PURE__*/ createUseReadContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'verifyMetadata',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__
 */
export const useWriteWeb3ProjectFactory = /*#__PURE__*/ createUseWriteContract({
  abi: web3ProjectFactoryAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"createProject"`
 */
export const useWriteWeb3ProjectFactoryCreateProject =
  /*#__PURE__*/ createUseWriteContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'createProject',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"createProjectWithMetadata"`
 */
export const useWriteWeb3ProjectFactoryCreateProjectWithMetadata =
  /*#__PURE__*/ createUseWriteContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'createProjectWithMetadata',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteWeb3ProjectFactoryRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteWeb3ProjectFactoryTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__
 */
export const useSimulateWeb3ProjectFactory =
  /*#__PURE__*/ createUseSimulateContract({ abi: web3ProjectFactoryAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"createProject"`
 */
export const useSimulateWeb3ProjectFactoryCreateProject =
  /*#__PURE__*/ createUseSimulateContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'createProject',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"createProjectWithMetadata"`
 */
export const useSimulateWeb3ProjectFactoryCreateProjectWithMetadata =
  /*#__PURE__*/ createUseSimulateContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'createProjectWithMetadata',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateWeb3ProjectFactoryRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateWeb3ProjectFactoryTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link web3ProjectFactoryAbi}__
 */
export const useWatchWeb3ProjectFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: web3ProjectFactoryAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 */
export const useWatchWeb3ProjectFactoryEip712DomainChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: web3ProjectFactoryAbi,
    eventName: 'EIP712DomainChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchWeb3ProjectFactoryOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: web3ProjectFactoryAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `eventName` set to `"ProjectCreated"`
 */
export const useWatchWeb3ProjectFactoryProjectCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: web3ProjectFactoryAbi,
    eventName: 'ProjectCreated',
  })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iWeb3ProjectAbi}__
 */
export const readIWeb3Project = /*#__PURE__*/ createReadContract({
  abi: iWeb3ProjectAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iWeb3ProjectAbi}__ and `functionName` set to `"getOwner"`
 */
export const readIWeb3ProjectGetOwner = /*#__PURE__*/ createReadContract({
  abi: iWeb3ProjectAbi,
  functionName: 'getOwner',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iWeb3ProjectAbi}__
 */
export const writeIWeb3Project = /*#__PURE__*/ createWriteContract({
  abi: iWeb3ProjectAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iWeb3ProjectAbi}__ and `functionName` set to `"initialize"`
 */
export const writeIWeb3ProjectInitialize = /*#__PURE__*/ createWriteContract({
  abi: iWeb3ProjectAbi,
  functionName: 'initialize',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iWeb3ProjectAbi}__ and `functionName` set to `"initializeWithMetadata"`
 */
export const writeIWeb3ProjectInitializeWithMetadata =
  /*#__PURE__*/ createWriteContract({
    abi: iWeb3ProjectAbi,
    functionName: 'initializeWithMetadata',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iWeb3ProjectAbi}__
 */
export const simulateIWeb3Project = /*#__PURE__*/ createSimulateContract({
  abi: iWeb3ProjectAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iWeb3ProjectAbi}__ and `functionName` set to `"initialize"`
 */
export const simulateIWeb3ProjectInitialize =
  /*#__PURE__*/ createSimulateContract({
    abi: iWeb3ProjectAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iWeb3ProjectAbi}__ and `functionName` set to `"initializeWithMetadata"`
 */
export const simulateIWeb3ProjectInitializeWithMetadata =
  /*#__PURE__*/ createSimulateContract({
    abi: iWeb3ProjectAbi,
    functionName: 'initializeWithMetadata',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iWeb3ProjectFactoryAbi}__
 */
export const readIWeb3ProjectFactory = /*#__PURE__*/ createReadContract({
  abi: iWeb3ProjectFactoryAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iWeb3ProjectFactoryAbi}__ and `functionName` set to `"getVerifier"`
 */
export const readIWeb3ProjectFactoryGetVerifier =
  /*#__PURE__*/ createReadContract({
    abi: iWeb3ProjectFactoryAbi,
    functionName: 'getVerifier',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iWeb3ProjectFactoryAbi}__ and `functionName` set to `"verifyMetadata"`
 */
export const readIWeb3ProjectFactoryVerifyMetadata =
  /*#__PURE__*/ createReadContract({
    abi: iWeb3ProjectFactoryAbi,
    functionName: 'verifyMetadata',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectAbi}__
 */
export const readWeb3Project = /*#__PURE__*/ createReadContract({
  abi: web3ProjectAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"getLatestMetadata"`
 */
export const readWeb3ProjectGetLatestMetadata =
  /*#__PURE__*/ createReadContract({
    abi: web3ProjectAbi,
    functionName: 'getLatestMetadata',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"getLatestMetrics"`
 */
export const readWeb3ProjectGetLatestMetrics = /*#__PURE__*/ createReadContract(
  { abi: web3ProjectAbi, functionName: 'getLatestMetrics' },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"getOwner"`
 */
export const readWeb3ProjectGetOwner = /*#__PURE__*/ createReadContract({
  abi: web3ProjectAbi,
  functionName: 'getOwner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"metricsSnapshots"`
 */
export const readWeb3ProjectMetricsSnapshots = /*#__PURE__*/ createReadContract(
  { abi: web3ProjectAbi, functionName: 'metricsSnapshots' },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"owner"`
 */
export const readWeb3ProjectOwner = /*#__PURE__*/ createReadContract({
  abi: web3ProjectAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"projectSnapshots"`
 */
export const readWeb3ProjectProjectSnapshots = /*#__PURE__*/ createReadContract(
  { abi: web3ProjectAbi, functionName: 'projectSnapshots' },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link web3ProjectAbi}__
 */
export const writeWeb3Project = /*#__PURE__*/ createWriteContract({
  abi: web3ProjectAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"initialize"`
 */
export const writeWeb3ProjectInitialize = /*#__PURE__*/ createWriteContract({
  abi: web3ProjectAbi,
  functionName: 'initialize',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"initializeWithMetadata"`
 */
export const writeWeb3ProjectInitializeWithMetadata =
  /*#__PURE__*/ createWriteContract({
    abi: web3ProjectAbi,
    functionName: 'initializeWithMetadata',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"updateMetadata"`
 */
export const writeWeb3ProjectUpdateMetadata = /*#__PURE__*/ createWriteContract(
  { abi: web3ProjectAbi, functionName: 'updateMetadata' },
)

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link web3ProjectAbi}__
 */
export const simulateWeb3Project = /*#__PURE__*/ createSimulateContract({
  abi: web3ProjectAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"initialize"`
 */
export const simulateWeb3ProjectInitialize =
  /*#__PURE__*/ createSimulateContract({
    abi: web3ProjectAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"initializeWithMetadata"`
 */
export const simulateWeb3ProjectInitializeWithMetadata =
  /*#__PURE__*/ createSimulateContract({
    abi: web3ProjectAbi,
    functionName: 'initializeWithMetadata',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"updateMetadata"`
 */
export const simulateWeb3ProjectUpdateMetadata =
  /*#__PURE__*/ createSimulateContract({
    abi: web3ProjectAbi,
    functionName: 'updateMetadata',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link web3ProjectAbi}__
 */
export const watchWeb3ProjectEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: web3ProjectAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link web3ProjectAbi}__ and `eventName` set to `"MetadataUpdated"`
 */
export const watchWeb3ProjectMetadataUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: web3ProjectAbi,
    eventName: 'MetadataUpdated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link web3ProjectAbi}__ and `eventName` set to `"MetricsUpdated"`
 */
export const watchWeb3ProjectMetricsUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: web3ProjectAbi,
    eventName: 'MetricsUpdated',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__
 */
export const readWeb3ProjectFactory = /*#__PURE__*/ createReadContract({
  abi: web3ProjectFactoryAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"createDigest"`
 */
export const readWeb3ProjectFactoryCreateDigest =
  /*#__PURE__*/ createReadContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'createDigest',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"eip712Domain"`
 */
export const readWeb3ProjectFactoryEip712Domain =
  /*#__PURE__*/ createReadContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'eip712Domain',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"getProjects"`
 */
export const readWeb3ProjectFactoryGetProjects =
  /*#__PURE__*/ createReadContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'getProjects',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"getVerifier"`
 */
export const readWeb3ProjectFactoryGetVerifier =
  /*#__PURE__*/ createReadContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'getVerifier',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"implementation"`
 */
export const readWeb3ProjectFactoryImplementation =
  /*#__PURE__*/ createReadContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'implementation',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"owner"`
 */
export const readWeb3ProjectFactoryOwner = /*#__PURE__*/ createReadContract({
  abi: web3ProjectFactoryAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"projects"`
 */
export const readWeb3ProjectFactoryProjects = /*#__PURE__*/ createReadContract({
  abi: web3ProjectFactoryAbi,
  functionName: 'projects',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"recoverSigner"`
 */
export const readWeb3ProjectFactoryRecoverSigner =
  /*#__PURE__*/ createReadContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'recoverSigner',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"verifier"`
 */
export const readWeb3ProjectFactoryVerifier = /*#__PURE__*/ createReadContract({
  abi: web3ProjectFactoryAbi,
  functionName: 'verifier',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"verifyMetadata"`
 */
export const readWeb3ProjectFactoryVerifyMetadata =
  /*#__PURE__*/ createReadContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'verifyMetadata',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__
 */
export const writeWeb3ProjectFactory = /*#__PURE__*/ createWriteContract({
  abi: web3ProjectFactoryAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"createProject"`
 */
export const writeWeb3ProjectFactoryCreateProject =
  /*#__PURE__*/ createWriteContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'createProject',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"createProjectWithMetadata"`
 */
export const writeWeb3ProjectFactoryCreateProjectWithMetadata =
  /*#__PURE__*/ createWriteContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'createProjectWithMetadata',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeWeb3ProjectFactoryRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeWeb3ProjectFactoryTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__
 */
export const simulateWeb3ProjectFactory = /*#__PURE__*/ createSimulateContract({
  abi: web3ProjectFactoryAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"createProject"`
 */
export const simulateWeb3ProjectFactoryCreateProject =
  /*#__PURE__*/ createSimulateContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'createProject',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"createProjectWithMetadata"`
 */
export const simulateWeb3ProjectFactoryCreateProjectWithMetadata =
  /*#__PURE__*/ createSimulateContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'createProjectWithMetadata',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateWeb3ProjectFactoryRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateWeb3ProjectFactoryTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link web3ProjectFactoryAbi}__
 */
export const watchWeb3ProjectFactoryEvent =
  /*#__PURE__*/ createWatchContractEvent({ abi: web3ProjectFactoryAbi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 */
export const watchWeb3ProjectFactoryEip712DomainChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: web3ProjectFactoryAbi,
    eventName: 'EIP712DomainChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchWeb3ProjectFactoryOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: web3ProjectFactoryAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `eventName` set to `"ProjectCreated"`
 */
export const watchWeb3ProjectFactoryProjectCreatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: web3ProjectFactoryAbi,
    eventName: 'ProjectCreated',
  })
