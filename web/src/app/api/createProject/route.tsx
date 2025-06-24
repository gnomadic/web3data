// import { Address, createPublicClient, hashMessage, recoverAddress, toBytes, toHex } from 'viem';
// // import { pinJSONToIPFS } from '@/lib/ipfs'; // you write this
// import { privateKeyToAccount } from 'viem/accounts';
// import { uploadToIPFS } from '../project/ipfs';
// import { NextRequest, NextResponse } from 'next/server';
// import dotenv from 'dotenv';
// import { findByChainId } from '@/lib/deployments';
// dotenv.config();
// import { hashTypedData, keccak256, stringToBytes } from 'viem';
// import { readContract } from 'viem/actions';
// import { web3ProjectAbi, web3ProjectFactoryAbi } from '@/generated';

// const privateKey = process.env.VERIFIER_PRIVATE_KEY as `0x${string}`;

// export async function POST(request: NextRequest) {
//     const params = await request.json()
//     const metadata = params.metadata;
//     const owner = params.owner;
//     const chainId = params.chainId;
//     const deployment = findByChainId(chainId as number);
//     //TODO validate params


//     const domain = {
//         name: "Web3Metrics",
//         version: "1",
//         chainId: chainId as number,
//         verifyingContract: deployment?.Web3ProjectFactory as Address,
//     };


//     const types = {
//         MetadataPayload: [
//             { name: "verifiableData", type: "string" },
//             { name: "owner", type: "address" },
//             { name: "timestamp", type: "uint256" },
//         ],
//     };

//     const timestamp = Math.floor(Date.now() / 1000);


//     const value = {
//         verifiableData: metadata,
//         owner: owner,
//         timestamp: timestamp,
//     };


//     // const client = createPublicClient({
//     //     chain: deployment?.viemChain,
//     //     transport: deployment?.viemTransport
//     // })

//     // const digest = await client.readContract({
//     //     address: deployment?.Web3ProjectFactory,
//     //     abi: web3ProjectFactoryAbi,
//     //     functionName: 'createDigest',
//     //     args: [
//     //         toHex("MetadataPayload(string verifiableData,address owner,uint256 timestamp)"),
//     //         { 
//     //             verifiableData: metadata, 
//     //             owner: owner, 
//     //             timestamp: BigInt(timestamp) 
//     //         },
//     //     ],
//     // });

//     // console.log('onchain digest:', digest);

//     const account = privateKeyToAccount(privateKey as Address);

//     const signature = await account.signTypedData({
//         domain,
//         types,
//         primaryType: "MetadataPayload",
//         message: value,
//     });


//     const dataToUpload = {
//         metadata,
//         signature,
//         timestamp,
//     };

//     console.log("dataToUpload", dataToUpload);
//     const cid = await uploadToIPFS(dataToUpload);
//     console.log("cid", cid);
//     return NextResponse.json(
//         {
//             metadataCID: cid,
//             signature,
//             timestamp,
//             input: value, // the input data used for signing
//             // digest
//         },
//         { status: 200 }
//     );
// }


import { NextRequest, NextResponse } from 'next/server';
import { privateKeyToAccount } from 'viem/accounts';
// import { uploadToIPFS } from '@/lib/ipfs'; // <- assume this returns a CID string
import { findByChainId } from '@/lib/deployments';
import { Address, createPublicClient, createWalletClient, http, toHex } from 'viem';
import { web3ProjectFactoryAbi } from '@/generated';
import { baseSepolia } from 'viem/chains';
import { uploadToIPFS } from '../project/ipfs';
import { bigIntReplacer } from '@/lib/utils';
import { sign } from 'crypto';

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

    // const payload: { verifiableData: string; owner: Address; timestamp: bigint } = {
    //     // verifiableData: JSON.stringify(metadata),
    //     verifiableData: metadata,
    //     owner,
    //     timestamp: BigInt(timestamp),
    // };

    const metadataString = JSON.stringify(metadata); // serialize
const payload:  { verifiableData: string; owner: Address; timestamp: bigint } = {
  verifiableData: metadataString,
  owner,
    timestamp: BigInt(timestamp),
};

    // const payload = JSON.stringify(payloadRaw, bigIntReplacer);

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

    const metadataCID = await uploadToIPFS(ipfsData);





    const client = createPublicClient({
        chain: deployment?.viemChain,
        transport: deployment?.viemTransport
    })

    const writeClient = createWalletClient({
        chain: deployment?.viemChain,
        transport: http(`https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
        key: privateKey,
    });

    const payload2: { verifiableData: string; owner: Address; timestamp: bigint } = {
        verifiableData: JSON.stringify(metadata),
        owner,
        timestamp: BigInt(timestamp + 100),
    }; 

    const verified = await client.readContract({
        address: contractAddress,
        abi: web3ProjectFactoryAbi,
        functionName: 'verifyMetadata',
        args: [
            payload,
            // payload2,

            signature,
        ],
    });

    // const create = await writeClient.writeContract({
    //     address: contractAddress,
    //     abi: web3ProjectFactoryAbi,
    //     functionName: 'createProjectWithMetadata',
    //     account: "0x4588a3747bF53b3d1fB94123cC207ee5cfE26170",
    //     args: [
    //         metadataCID,
    //         BigInt(timestamp),
    //         signature,
    //         JSON.stringify(payload), // ensure payload is serialized correctly
    //         // payload, // ensure payload is serialized correctly
    //         // JSON.stringify(payload, bigIntReplacer), // ensure BigInt is handled correctly
    //     ],
    // });

    console.log('payload: ', payload);
    console.log('payload data: ', payload.verifiableData);
    console.log('payload owner: ', payload.owner);
    console.log('payload timestamp: ', payload.timestamp);
    console.log('signature:',signature);
    console.log('verified onchain: ', JSON.stringify(verified));







    return NextResponse.json({ 
        metadataCID, 
        signature, 
        timestamp, 
        payload: { ...payload, timestamp: Number(payload.timestamp) },
    });

    console.log('verified onchain:', verified);


   

    return NextResponse.json({ 
        metadataCID, 
        signature, 
        timestamp, 
        payload: { ...payload, timestamp: Number(payload.timestamp) }
    });
}