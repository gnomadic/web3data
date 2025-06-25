"use client";

import { useCreateProject } from '@/hooks/useCreateProject';
import { Address, Hex } from 'viem';
import { Button } from './ui/button';
import {  useWriteWeb3ProjectFactoryCreateProjectWithMetadata } from '@/generated';
import { useAccount } from 'wagmi';
import { useDeployment } from '@/hooks/useDeployment';

export default function CreateButton() {
    const { createProject, returnValue } = useCreateProject();

    const { deploy } = useDeployment();
    const { writeContract: createIt } = useWriteWeb3ProjectFactoryCreateProjectWithMetadata({})
    // const { isLoading, isSuccess, isError, error } = useWaitForTransactionReceipt({ hash })
    const { address } = useAccount();


    async function handleClick() {
        const name = 'My Project';
        const description = 'An amazing thing onchain';
        await createProject(address ?? "0x0", 84532, JSON.stringify({
            name: name, 
            description: description,
            contracts: ["0x4803b165381796276c7c211cca649174ba2df81f"]
        }));
    }


    return (
        <div>
            <div>
                <Button onClick={handleClick}>Create Project</Button>
                <Button
                    //  onClick={handleSign}
                    onClick={() => {
                        console.log('returnValue', JSON.stringify(returnValue, null, 2));

                        createIt({
                            args: [
                                returnValue.metadataCID as string,

                                {
                                    verifiableData: returnValue.payload.verifiableData,
                                    owner: returnValue.payload.owner,
                                    timestamp: BigInt(returnValue.payload.timestamp)
                                },
                                // BigInt(returnValue.timestamp),
                                returnValue.signature as Hex,
                                // returnValue.payload as string
                                // JSON.stringify(returnValue.payload)
                            ],
                            address: deploy.Web3ProjectFactory as Address,
                        });
                    }}
                >

                    Upload Project </Button>
            </div>

  
        </div>

    );
}