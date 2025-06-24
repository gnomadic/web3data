"use client";

import { CreateProjectForm } from "./CreateProjectForm";
import { useState } from "react";
import ProjectCardList from "./ProjectCardList";
import { useAccount } from "wagmi";
// import { useCreateProject } from "@/hooks/useCreateProject";

export default function ProjectList() {
  const [modalOpen, setModalOpen] = useState(false);

  // const { deploy } = useDeployment();
  const { address } = useAccount();

  // const { writeContract } = useWriteWeb3ProjectFactoryCreateProject();
  // const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash })


  // const { createProject } = useCreateProject();




  async function handleCreateProject(name: string, description: string) {
    if (!address) {
      console.error("Wallet not connected");
      return;
    }
    console.log(`creating project for address: ${address}, name: ${name}, description: ${description}`);

    setModalOpen(false);
    // const { metadataCID, signature, timestamp, input } = await createProject(address, name, description);




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
