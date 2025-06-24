import { useCreateProject } from '@/hooks/useCreateProject';
import { Address, Hex } from 'viem';
import { Button } from './ui/button';
import { useReadWeb3ProjectFactoryVerifyMetadata, useWriteWeb3ProjectFactoryCreateProjectWithMetadata, writeWeb3ProjectFactoryCreateProjectWithMetadata } from '@/generated';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useDeployment } from '@/hooks/useDeployment';
import { useEffect } from 'react';

export default function CreateButton({ owner }: { owner: Address }) {
    const { createProject, returnValue } = useCreateProject();

    const { deploy } = useDeployment();
    const { data: hash, writeContract: createIt, isPending, error: writeError } = useWriteWeb3ProjectFactoryCreateProjectWithMetadata(
        {}
    )
    const { isLoading, isSuccess, isError, error } = useWaitForTransactionReceipt({ hash })
    const { address } = useAccount();

    //    MetadataPayload memory payload,
    // bytes memory signature
    //         struct MetadataPayload {
    //     string verifiableData;
    //     address owner;
    //     uint256 timestamp;
    // }
    // const { data: verified, isLoading: verifyLoading, isSuccess: verSucc, error: verError, refetch } = useReadWeb3ProjectFactoryVerifyMetadata({
    //     args: [
    //         {
    //             verifiableData: (returnValue?.payload as string),
    //             owner: address ?? "0x0",
    //             timestamp: returnValue ? BigInt(returnValue?.timestamp) : BigInt(0)
    //         },
    //         returnValue?.signature as Hex,
    //     ]
    // });

    async function handleClick() {
        const name = 'My Project';
        const description = 'An amazing thing onchain';
        await createProject(owner, name, description);
    }

    // useEffect(() => {
    //     if (returnValue) {
    //         refetch();
    //     }
    // }, [returnValue, refetch]);

    async function handleSign() {

        console.log('returnValue', JSON.stringify(returnValue, null, 2));

        await createIt({
            args: [
                returnValue.metadataCID as string,
                returnValue,
                // BigInt(returnValue.timestamp),
                returnValue.signature as Hex,
                // returnValue.payload as string
                // JSON.stringify(returnValue.payload)
            ],
            address: deploy.Web3ProjectFactory,
        });
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
            <div>
                error: {isError ? error?.message : 'No error'}
            </div>
            <div>
                    <div>
                    create pending: {JSON.stringify(isPending)}
                </div>
                             <div>
                    create error: {JSON.stringify(writeError)}
                </div>
                <div>
                    create Loading: {JSON.stringify(isLoading)}
                </div>
                <div>
                    create success: {JSON.stringify(isSuccess)}
                </div>
                <div>
                    create error: {JSON.stringify(error)}
                </div>
                {/* <div>
                    create: {JSON.stringify(verified)}
                </div> */}
            </div>
        </div>

    );
}