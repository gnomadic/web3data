import {
  hashTypedData,
  toHex,
  createPublicClient,
  http,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { baseSepolia } from 'viem/chains';

const privateKey = '0x...'; // your trusted signer key
const account = privateKeyToAccount(privateKey);

const domain = {
  name: 'Web3Metadata',
  version: '1',
  chainId: 84532, // or your chain
  verifyingContract: '0xVerifierContractAddress',
};

const types = {
  MetadataPayload: [
    { name: 'verifiableData', type: 'string' },
    { name: 'owner', type: 'address' },
    { name: 'timestamp', type: 'uint256' },
  ],
};

export async function signMetadata(verifiableData: string, owner: `0x${string}`) {
  const timestamp = Math.floor(Date.now() / 1000);

  const message = {
    verifiableData,
    owner,
    timestamp,
  };

  const signature = await account.signTypedData({
    domain,
    types,
    primaryType: 'MetadataPayload',
    message,
  });

  return { ...message, signature };
}

export async function verifyOnchain(payload: {
  verifiableData: string;
  owner: `0x${string}`;
  timestamp: number;
  signature: `0x${string}`;
}) {
  const client = createPublicClient({
    chain: baseSepolia,
    transport: http('https://base-sepolia.g.alchemy.com/v2/YOUR_KEY'),
  });

  return await client.readContract({
    address: domain.verifyingContract,
    abi: verifierAbi,
    functionName: 'verify',
    args: [
      {
        verifiableData: payload.verifiableData,
        owner: payload.owner,
        timestamp: BigInt(payload.timestamp),
      },
      payload.signature,
    ],
  });
}