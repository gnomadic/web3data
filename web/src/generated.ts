import {
  createUseWriteContract,
  createUseSimulateContract,
  createUseReadContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

import {
  createWriteContract,
  createSimulateContract,
  createReadContract,
  createWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ISupplyToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iSupplyTokenAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'systemController', internalType: 'address', type: 'address' },
      { name: 'scenario', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IWeb3Project
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iWeb3ProjectAbi = [
  {
    type: 'function',
    inputs: [{ name: 'creator', internalType: 'address', type: 'address' }],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Web3Project
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const web3ProjectAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'getSnapshot',
    outputs: [
      {
        name: '',
        internalType: 'struct Web3Project.Web3MetricsSnapshot',
        type: 'tuple',
        components: [
          { name: 'ipfsHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'creator', internalType: 'address', type: 'address' }],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [],
    name: 'snapshotCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'snapshots',
    outputs: [
      { name: 'ipfsHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'ipfsHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'uploadSnapshot',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'ipfsHash',
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
    name: 'SnapshotUploaded',
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
    inputs: [],
    name: 'getProjects',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iSupplyTokenAbi}__
 */
export const useWriteISupplyToken = /*#__PURE__*/ createUseWriteContract({
  abi: iSupplyTokenAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iSupplyTokenAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteISupplyTokenInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: iSupplyTokenAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iSupplyTokenAbi}__
 */
export const useSimulateISupplyToken = /*#__PURE__*/ createUseSimulateContract({
  abi: iSupplyTokenAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iSupplyTokenAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateISupplyTokenInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iSupplyTokenAbi,
    functionName: 'initialize',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectAbi}__
 */
export const useReadWeb3Project = /*#__PURE__*/ createUseReadContract({
  abi: web3ProjectAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"getSnapshot"`
 */
export const useReadWeb3ProjectGetSnapshot =
  /*#__PURE__*/ createUseReadContract({
    abi: web3ProjectAbi,
    functionName: 'getSnapshot',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"owner"`
 */
export const useReadWeb3ProjectOwner = /*#__PURE__*/ createUseReadContract({
  abi: web3ProjectAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"snapshotCount"`
 */
export const useReadWeb3ProjectSnapshotCount =
  /*#__PURE__*/ createUseReadContract({
    abi: web3ProjectAbi,
    functionName: 'snapshotCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"snapshots"`
 */
export const useReadWeb3ProjectSnapshots = /*#__PURE__*/ createUseReadContract({
  abi: web3ProjectAbi,
  functionName: 'snapshots',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"uploadSnapshot"`
 */
export const useWriteWeb3ProjectUploadSnapshot =
  /*#__PURE__*/ createUseWriteContract({
    abi: web3ProjectAbi,
    functionName: 'uploadSnapshot',
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"uploadSnapshot"`
 */
export const useSimulateWeb3ProjectUploadSnapshot =
  /*#__PURE__*/ createUseSimulateContract({
    abi: web3ProjectAbi,
    functionName: 'uploadSnapshot',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link web3ProjectAbi}__
 */
export const useWatchWeb3ProjectEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: web3ProjectAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link web3ProjectAbi}__ and `eventName` set to `"SnapshotUploaded"`
 */
export const useWatchWeb3ProjectSnapshotUploadedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: web3ProjectAbi,
    eventName: 'SnapshotUploaded',
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
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iSupplyTokenAbi}__
 */
export const writeISupplyToken = /*#__PURE__*/ createWriteContract({
  abi: iSupplyTokenAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iSupplyTokenAbi}__ and `functionName` set to `"initialize"`
 */
export const writeISupplyTokenInitialize = /*#__PURE__*/ createWriteContract({
  abi: iSupplyTokenAbi,
  functionName: 'initialize',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iSupplyTokenAbi}__
 */
export const simulateISupplyToken = /*#__PURE__*/ createSimulateContract({
  abi: iSupplyTokenAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iSupplyTokenAbi}__ and `functionName` set to `"initialize"`
 */
export const simulateISupplyTokenInitialize =
  /*#__PURE__*/ createSimulateContract({
    abi: iSupplyTokenAbi,
    functionName: 'initialize',
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
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectAbi}__
 */
export const readWeb3Project = /*#__PURE__*/ createReadContract({
  abi: web3ProjectAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"getSnapshot"`
 */
export const readWeb3ProjectGetSnapshot = /*#__PURE__*/ createReadContract({
  abi: web3ProjectAbi,
  functionName: 'getSnapshot',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"owner"`
 */
export const readWeb3ProjectOwner = /*#__PURE__*/ createReadContract({
  abi: web3ProjectAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"snapshotCount"`
 */
export const readWeb3ProjectSnapshotCount = /*#__PURE__*/ createReadContract({
  abi: web3ProjectAbi,
  functionName: 'snapshotCount',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"snapshots"`
 */
export const readWeb3ProjectSnapshots = /*#__PURE__*/ createReadContract({
  abi: web3ProjectAbi,
  functionName: 'snapshots',
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
 * Wraps __{@link writeContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"uploadSnapshot"`
 */
export const writeWeb3ProjectUploadSnapshot = /*#__PURE__*/ createWriteContract(
  { abi: web3ProjectAbi, functionName: 'uploadSnapshot' },
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
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link web3ProjectAbi}__ and `functionName` set to `"uploadSnapshot"`
 */
export const simulateWeb3ProjectUploadSnapshot =
  /*#__PURE__*/ createSimulateContract({
    abi: web3ProjectAbi,
    functionName: 'uploadSnapshot',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link web3ProjectAbi}__
 */
export const watchWeb3ProjectEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: web3ProjectAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link web3ProjectAbi}__ and `eventName` set to `"SnapshotUploaded"`
 */
export const watchWeb3ProjectSnapshotUploadedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: web3ProjectAbi,
    eventName: 'SnapshotUploaded',
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
