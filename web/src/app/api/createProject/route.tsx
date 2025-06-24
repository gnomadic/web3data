import { NextRequest, NextResponse } from 'next/server';
import { privateKeyToAccount } from 'viem/accounts';
import { findByChainId } from '@/lib/deployments';
import { Address } from 'viem';
import { uploadWeb3ProjectToIPFS } from '@/lib/ipfs/Pinata';

const privateKey = process.env.VERIFIER_PRIVATE_KEY! as `0x${string}`;

export async function POST(req: NextRequest) {
    const { metadata, owner, chainId } = await req.json();
    const timestamp = Math.floor(Date.now() / 1000);

    const deployment = findByChainId(chainId);
    const contractAddress = deployment.Web3ProjectFactory;

    const domain = {
        name: 'Web3Metrics',
        version: '1',
        chainId,
        verifyingContract: contractAddress,
    };

    const types = {
        MetadataPayload: [
            { name: 'verifiableData', type: 'string' },
            { name: 'owner', type: 'address' },
            { name: 'timestamp', type: 'uint256' },
        ],
    };

    const metadataString = JSON.stringify(metadata); // serialize
    const payload: { verifiableData: string; owner: Address; timestamp: bigint } = {
        verifiableData: metadataString,
        owner,
        timestamp: BigInt(timestamp),
    };


    const account = privateKeyToAccount(privateKey);
    const signature = await account.signTypedData({
        domain,
        types,
        primaryType: 'MetadataPayload',
        message: payload,
    });

    const ipfsData = {
        metadata,
        signature,
        timestamp,
    };

    const metadataCID = await uploadWeb3ProjectToIPFS(ipfsData);

    return NextResponse.json({
        metadataCID,
        signature,
        timestamp,
        payload: { ...payload, timestamp: Number(payload.timestamp) },
    });
}
