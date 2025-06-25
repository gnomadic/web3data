"use client";

import { CreateProjectForm } from "./CreateProjectForm";
import { useState } from "react";
import ProjectCardList from "./ProjectCardList";
import { useAccount } from "wagmi";
import { useDeployment } from "@/hooks/useDeployment";
import { useCreateProject } from "@/hooks/useCreateProject";
import { useWriteWeb3ProjectFactoryCreateProjectWithMetadata } from "@/generated";
import { ProjectMetadata } from "@/lib/types/types";
// import { useCreateProject } from "@/hooks/useCreateProject";

export default function ProjectList() {
  const [modalOpen, setModalOpen] = useState(false);

  // const { deploy } = useDeployment();
  const { address } = useAccount();
  const { deploy } = useDeployment();

  const { createProject, returnValue } = useCreateProject();


  const { writeContract: createIt } = useWriteWeb3ProjectFactoryCreateProjectWithMetadata({})
  // const { isLoading, isSuccess, isError, error } = useWaitForTransactionReceipt({ hash })

  // const { writeContract } = useWriteWeb3ProjectFactoryCreateProject();
  // const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash })


  // const { createProject } = useCreateProject();




  async function handleCreateProject(metadata: ProjectMetadata) {
    if (!address) {
      console.error("Wallet not connected");
      return;
    }
    console.log(`creating project for address: ${address}, name: ${metadata.name}, description: ${metadata.description}`);

    setModalOpen(false);
    // const { metadataCID, signature, timestamp, input } = await createProject(address, name, description);

    await createProject(address ?? "0x0", 84532, JSON.stringify(metadata));


    // await writeContract({
    //   address: deploy.Web3ProjectFactory, args: [
    //     // metadataCID,
    //     // timestamp,
    //     // signature,
    //     // input
    //   ]
    // });
  }

  return (
    <section>

      <ProjectCardList
        openCreateProject={() => setModalOpen(true)}
      />
      <CreateProjectForm
        open={modalOpen}
        onOpenChange={setModalOpen}
        onCreate={handleCreateProject}

      />
    </section>
  );
}
