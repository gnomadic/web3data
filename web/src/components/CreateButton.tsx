import { useCreateProject } from '@/hooks/useCreateProject';
import { Address, Hex } from 'viem';
import { Button } from './ui/button';
import { useWriteWeb3ProjectFactoryCreateProjectWithMetadata, writeWeb3ProjectFactoryCreateProjectWithMetadata } from '@/generated';
import { useWaitForTransactionReceipt } from 'wagmi';
import { useDeployment } from '@/hooks/useDeployment';

export default function CreateButton({ owner }: { owner: Address }) {
    const { createProject, returnValue } = useCreateProject();

    const { deploy } = useDeployment();
    const { data: hash, writeContract: createIt } = useWriteWeb3ProjectFactoryCreateProjectWithMetadata(
        {}
    )
    const { isLoading, isSuccess, isError, error } = useWaitForTransactionReceipt({ hash })

    async function handleClick() {
        const name = 'My Project';
        const description = 'An amazing thing onchain';
        await createProject(owner, name, description);
    }

    async function handleSign() {

        createIt({
            args: [
                returnValue.metadataCID as string,
                returnValue.timestamp as bigint,
                returnValue.signature as Hex,
                returnValue.payload as string
            ],
            address: deploy.Web3ProjectFactory as Address,
        });
    }



        return (
            <div>
            <div>
                <Button onClick={handleClick}>Create Project</Button>
                <Button onClick={handleSign}>Upload Project</Button>
            </div>
            <div>
                error: {isError ? error?.message : 'No error'}
            </div>
            </div>
            
        );
    }