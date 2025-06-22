import { Address, createPublicClient, hashMessage, recoverAddress, toBytes, toHex } from 'viem';
// import { pinJSONToIPFS } from '@/lib/ipfs'; // you write this
import { privateKeyToAccount } from 'viem/accounts';
import { uploadToIPFS } from '../project/ipfs';
import { NextRequest, NextResponse } from 'next/server';
import dotenv from 'dotenv';
import { findByChainId } from '@/lib/deployments';
dotenv.config();
import { hashTypedData, keccak256, stringToBytes } from 'viem';
import { readContract } from 'viem/actions';
import { web3ProjectAbi, web3ProjectFactoryAbi } from '@/generated';

const privateKey = process.env.VERIFIER_PRIVATE_KEY as `0x${string}`;

export async function POST(request: NextRequest) {
    const params = await request.json()
    const metadata = params.metadata;
    const owner = params.owner;
    const chainId = params.chainId;
    const deployment = findByChainId(chainId as number);
    //TODO validate params


    const domain = {
        name: "Web3Metrics",
        version: "1",
        chainId: chainId as number,
        verifyingContract: deployment?.Web3ProjectFactory as Address,
    };


    const types = {
        MetadataPayload: [
            { name: "verifiableData", type: "string" },
            { name: "owner", type: "address" },
            { name: "timestamp", type: "uint256" },
        ],
    };

    const timestamp = Math.floor(Date.now() / 1000);


    const value = {
        verifiableData: metadata,
        owner: owner,
        timestamp: timestamp,
    };


    // const client = createPublicClient({
    //     chain: deployment?.viemChain,
    //     transport: deployment?.viemTransport
    // })

    // const digest = await client.readContract({
    //     address: deployment?.Web3ProjectFactory,
    //     abi: web3ProjectFactoryAbi,
    //     functionName: 'createDigest',
    //     args: [
    //         toHex("MetadataPayload(string verifiableData,address owner,uint256 timestamp)"),
    //         { 
    //             verifiableData: metadata, 
    //             owner: owner, 
    //             timestamp: BigInt(timestamp) 
    //         },
    //     ],
    // });

    // console.log('onchain digest:', digest);

    const account = privateKeyToAccount(privateKey as Address);

    const signature = await account.signTypedData({
        domain,
        types,
        primaryType: "MetadataPayload",
        message: value,
    });


    const dataToUpload = {
        metadata,
        signature,
        timestamp,
    };

    console.log("dataToUpload", dataToUpload);
    const cid = await uploadToIPFS(dataToUpload);
    console.log("cid", cid);
    return NextResponse.json(
        {
            metadataCID: cid,
            signature,
            timestamp,
            // digest
        },
        { status: 200 }
    );
}
