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
          { name: 'metadataCID', internalType: 'bytes32', type: 'bytes32' },
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
          { name: 'metricsCID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'verifiableData', internalType: 'string', type: 'string' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'hashPayload',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'pure',
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
      { name: 'metadataCID', internalType: 'bytes32', type: 'bytes32' },
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
      { name: 'metricsCID', internalType: 'bytes32', type: 'bytes32' },
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
      { name: 'metadataCID', internalType: 'bytes32', type: 'bytes32' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'data', internalType: 'bytes32', type: 'bytes32' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'recoverSignerAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'metadataCID', internalType: 'bytes32', type: 'bytes32' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
      { name: 'input', internalType: 'string', type: 'string' },
    ],
    name: 'updateMetadata',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'metricsCID', internalType: 'bytes32', type: 'bytes32' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
      { name: 'input', internalType: 'string', type: 'string' },
    ],
    name: 'updateMetrics',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'input', internalType: 'string', type: 'string' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'verify',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'metadataID',
        internalType: 'bytes32',
        type: 'bytes32',
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
        internalType: 'bytes32',
        type: 'bytes32',
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
  { type: 'error', inputs: [], name: 'NOT_VERIFIED' },
  { type: 'error', inputs: [], name: 'NO_DATA' },
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
    inputs: [],
    name: 'createProject',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'metadataCID', internalType: 'bytes32', type: 'bytes32' },
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
  { type: 'error', inputs: [], name: 'FailedDeployment' },
  {
    type: 'error',
    inputs: [
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InsufficientBalance',
  },
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
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"hashPayload"`
 */
export const useReadWeb3ProjectHashPayload =
  /*#__PURE__*/ createUseReadContract({
    abi: web3ProjectAbi,
    functionName: 'hashPayload',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"recoverSignerAddress"`
 */
export const useReadWeb3ProjectRecoverSignerAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: web3ProjectAbi,
    functionName: 'recoverSignerAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"verify"`
 */
export const useReadWeb3ProjectVerify = /*#__PURE__*/ createUseReadContract({
  abi: web3ProjectAbi,
  functionName: 'verify',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"updateMetrics"`
 */
export const useWriteWeb3ProjectUpdateMetrics =
  /*#__PURE__*/ createUseWriteContract({
    abi: web3ProjectAbi,
    functionName: 'updateMetrics',
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"updateMetrics"`
 */
export const useSimulateWeb3ProjectUpdateMetrics =
  /*#__PURE__*/ createUseSimulateContract({
    abi: web3ProjectAbi,
    functionName: 'updateMetrics',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"verifier"`
 */
export const useReadWeb3ProjectFactoryVerifier =
  /*#__PURE__*/ createUseReadContract({
    abi: web3ProjectFactoryAbi,
    functionName: 'verifier',
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
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"hashPayload"`
 */
export const readWeb3ProjectHashPayload = /*#__PURE__*/ createReadContract({
  abi: web3ProjectAbi,
  functionName: 'hashPayload',
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
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"recoverSignerAddress"`
 */
export const readWeb3ProjectRecoverSignerAddress =
  /*#__PURE__*/ createReadContract({
    abi: web3ProjectAbi,
    functionName: 'recoverSignerAddress',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"verify"`
 */
export const readWeb3ProjectVerify = /*#__PURE__*/ createReadContract({
  abi: web3ProjectAbi,
  functionName: 'verify',
})

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
 * Wraps __{@link writeContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"updateMetrics"`
 */
export const writeWeb3ProjectUpdateMetrics = /*#__PURE__*/ createWriteContract({
  abi: web3ProjectAbi,
  functionName: 'updateMetrics',
})

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
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"updateMetrics"`
 */
export const simulateWeb3ProjectUpdateMetrics =
  /*#__PURE__*/ createSimulateContract({
    abi: web3ProjectAbi,
    functionName: 'updateMetrics',
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
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectFactoryAbi}__ and `functionName` set to `"verifier"`
 */
export const readWeb3ProjectFactoryVerifier = /*#__PURE__*/ createReadContract({
  abi: web3ProjectFactoryAbi,
  functionName: 'verifier',
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
