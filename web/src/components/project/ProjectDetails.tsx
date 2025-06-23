"use client";

import { useProjects } from "@/contexts/ProjectContext";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useDeployment } from "@/hooks/useDeployment";
import { useCreateProject } from "@/hooks/useCreateProject";
import { sign } from "crypto";
import { Address, Hex, toBytes, toHex } from "viem";
import { useReadIWeb3ProjectFactoryVerifyMetadata, useReadWeb3ProjectFactoryCreateDigest, useReadWeb3ProjectFactoryGetVerifier, useReadWeb3ProjectFactoryRecoverSigner, useReadWeb3ProjectGetLatestMetadata, useReadWeb3ProjectGetOwner, useWriteWeb3ProjectUpdateMetadata } from "@/generated";
import { bigIntReplacer } from "@/lib/utils";
import useGetIPFS from "@/hooks/useGetIPFS";
import CreateButton from "../CreateButton";


type Props = {
    projectAddress: Address;
};

export default function ProjectDetails({ projectAddress }: Props) {
    //   const { projects, createProject, addContract } = useProjects();
    const [modalOpen, setModalOpen] = useState(false);

    const { deploy } = useDeployment();
    const { address } = useAccount();

    // const { data: hash, error: writeError, writeContract } = useWriteWeb3ProjectFactoryCreateProjectWithMetadata();
    // const { data: hash, error: writeError, writeContract } = useWriteWeb3ProjectFactoryCreateProject();
    // const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash })

    // const {data} = useReadWeb3ProjectHashPayload({
    //   address: deploy.Web3ProjectFactory,
    //   args: [

    //     address
    //   ],

    // });



    const { createProject } = useCreateProject();


    //   onClick={() => {
    //           console.log("Accept Assignment button clicked");
    //           writeContract({ address: deploy.Planet, args: [address!] });
    //         }}

    async function handleCreateProject(name: string, description: string) {
        if (!address) {
            console.error("Wallet not connected");
            return;
        }
        console.log("creating");

        setModalOpen(false);
        const { metadataCID, signature, timestamp, input, digest: serverDigest, value } = await createProject(address, name, description);

        console.log("metadataCID", metadataCID);
        console.log("timestamp", timestamp);
        console.log("signature", signature);
        console.log("input", input);

        setDebugMetadataCID(metadataCID);
        setDebugSignature(signature);
        setDebugTimestamp(timestamp);
        setDebugInput(input);
        setServerDigest(serverDigest);
        setServerValue(value);

        // await writeContract({
        //     address: deploy.Web3ProjectFactory, args: [
        //         // metadataCID,
        //         // timestamp,
        //         // signature,
        //         // input
        //     ]
        // });


    }


    const { data: owner } = useReadWeb3ProjectGetOwner({
        address: projectAddress,
        args: [],
    });

    const { data: hash, writeContract: udpdateIt } = useWriteWeb3ProjectUpdateMetadata(
        {}
    )
    const { isLoading, isSuccess, isError, error } = useWaitForTransactionReceipt({ hash })


    const [debugTimestamp, setDebugTimestamp] = useState(0);
    const [debugSignature, setDebugSignature] = useState("");
    const [debugMetadataCID, setDebugMetadataCID] = useState("");
    const [debugInput, setDebugInput] = useState("");
    const [servierDigest, setServerDigest] = useState("");
    const [serverValue, setServerValue] = useState("");

    const { data: latest } = useReadWeb3ProjectGetLatestMetadata({
        address: projectAddress,
        args: [],
    });

    type Metadata = {
   metadata: string;
    signature: Hex;
    timestamp: number;
    }

    const {data} = useGetIPFS<Metadata>(latest?.metadataCID)

    const { data: verified } = useReadWeb3ProjectFactoryRecoverSigner({
        address: deploy?.Web3ProjectFactory,
        args: [
            {verifiableData: data?.metadata ?? "", owner: address!, timestamp: BigInt(debugTimestamp) },
            (latest && latest.signature) ? latest?.signature : "0x0",
            
        ]
    });

    const {data: latestMetadata} = useReadWeb3ProjectGetLatestMetadata({
        address: projectAddress,
        args: [],
    });

    const {data: ipfsMetadata} = useGetIPFS<Metadata>(latestMetadata?.metadataCID);
    const [veriData, setVeriData] = useState({
        verifiableData: "",
        owner: address!,
        timestamp: BigInt(0),
        sig: '0x0',
    });



    const {data: okok, isError: okokErro, isSuccess: okokSucc} = useReadIWeb3ProjectFactoryVerifyMetadata({
        address: deploy?.Web3ProjectFactory,
        args: [
            { verifiableData: `{"verifiableData":{"name":"Test Project","description":"This is a test project description"},"owner":"0x2273fFEd38ED040FBcd3e45Cd807594d27ebfAE3","timestamp":1750686091}`, owner: '0x2273fFEd38ED040FBcd3e45Cd807594d27ebfAE3', timestamp: BigInt(1750686091)},
            '0x4755232d8ac05624a8d82dc37984d9d867c1654febf615c8a5fd1fee4b3745543dd47f79ef26e377e192ef80ad57ab25a7004547fa19e2fccb8cb21ef7c858d51b',
        ]
    });

 



    useEffect(() => {
        if (ipfsMetadata && address) {
            setVeriData({
                verifiableData: ipfsMetadata.metadata,
                owner: address!,
                timestamp: BigInt(ipfsMetadata.timestamp),
                sig: ipfsMetadata.signature as `0x${string}`,
            });
        }
    }, [ipfsMetadata, address]);

        const {data: chainDigest} = useReadWeb3ProjectFactoryCreateDigest({
        address: deploy?.Web3ProjectFactory,
        args: [
            toHex("MetadataPayload(string verifiableData,address owner,uint256 timestamp)"),
            { verifiableData: veriData.verifiableData, owner: veriData.owner, timestamp: veriData.timestamp },
        ]
    });


    // const {data} = useReadWeb3ProjectFactoryDebugVerify({
    //   address: deploy.Web3ProjectFactory,
    //   args: [
    //     debugMetadataCID,
    //     debugTimestamp,
    //     debugSignature,
    //     debugInput
    //   ],
    // });


    // const { data: debugDigest } = useReadWeb3ProjectFactoryDigest({
    //     address: deploy?.Web3ProjectFactory,
    //     // args: [
    //     //     BigInt(debugTimestamp),
    //     //     debugSignature as `0x${string}`,
    //     //     debugInput
    //     // ],
    //     args: [
    //         { verifiableData: JSON.stringify(debugInput), owner: address!, timestamp: BigInt(debugTimestamp) },
    //         "0x0"
    //     ],

    // });

    //  {verifiableData: JSON.stringify(value), owner: owner, timestamp: BigInt(timestamp) },


    // const { data: debugVerify } = useReadWeb3ProjectFactoryDebugVerify({
    //     address: deploy?.Web3ProjectFactory,
    //     args: [
    //         { verifiableData: debugInput, owner: address!, timestamp: BigInt(debugTimestamp) },
    //         debugSignature as `0x${string}`,
    //     ],
    // }
    // )

    return (
        <section>

            <CreateButton owner={address as Address} />

            <div>owner: {JSON.stringify(owner)}</div>
            <div>latest metadata: {JSON.stringify(latest, bigIntReplacer)}</div>
            <div>from ipfs: {JSON.stringify(data)}</div>
            <div>verified: {JSON.stringify(verified)}</div>


            {/* <div>hash: {hash}</div>
            <div>writeError: {JSON.stringify(writeError)}</div>
            <div>isLoading: {JSON.stringify(isLoading)}</div>
            <div>isSuccess: {JSON.stringify(isSuccess)}</div> */}
            <div className="pt-12"></div>

            <div className="pb-48">
                <Button
                    onClick={() => {
                        console.log("testing it");
                        handleCreateProject("Test Project", "This is a test project description");

                    }}
                >prepare it</Button>

                <div> prepared</div>
                <div>CID: {JSON.stringify(debugMetadataCID)}</div>
                <div>SIG: {JSON.stringify(debugSignature)}</div>
                <div>TSX: {JSON.stringify(debugTimestamp)}</div>
                <div>INP: {JSON.stringify(debugInput)}</div>
                <div>DIG: {JSON.stringify(servierDigest)}</div>
                <div>VAL: {JSON.stringify(serverValue)}</div>

                <Button
                    onClick={() => {
                        console.log("testing it");
                        udpdateIt({
                            address: projectAddress,
                            args: [
                                debugMetadataCID,
                                BigInt(debugTimestamp),
                                debugSignature as `0x${string}`,
                                debugInput
                            ]
                        });
                        // writeContract({
                    }}
                >submit it</Button>


                <div className="pt-3"> onchain</div>
                <div>hash: {JSON.stringify(hash)}</div>
                <div>writeError: {JSON.stringify(isError ? error : "no error")}</div>
                <div>isLoading: {JSON.stringify(isLoading)}</div>
                <div>isSuccess: {JSON.stringify(isSuccess)}</div>



                <div className="pt-3"> details</div>
                {/* <div>debug digest: {JSON.stringify(debugDigest)}</div> */}
                {/* <div>debug verify: {JSON.stringify(debugVerify)}</div> */}
                <div>actual deploy: 0x4588a3747bF53b3d1fB94123cC207ee5cfE26170</div>
                {/* <div>hash: {JSON.stringify(hash)}</div>
                <div>writeError: {JSON.stringify(isError ? error : "no error")}</div>
                <div>isLoading: {JSON.stringify(isLoading)}</div>
                <div>isSuccess: {JSON.stringify(isSuccess)}</div> */}

                <div className="pt-3"> verify</div>
                <div>verified: {JSON.stringify(verified)}</div>
                <div>latest metadata: {JSON.stringify(latestMetadata, bigIntReplacer)}</div>
                <div>ipfs metadata: {JSON.stringify(ipfsMetadata, bigIntReplacer)}</div>
                {/* <div>veridata: {JSON.stringify(veriData, bigIntReplacer)}</div> */}
                <div>okok: {JSON.stringify(okok)}</div>
                <div>okokError: {JSON.stringify(okokErro)}</div>
                <div>okokSuc: {JSON.stringify(okokSucc)}</div>

                <div className="pt-3">onchian digest: {JSON.stringify(chainDigest)}</div>

            </div>
        </section>

    );
}
