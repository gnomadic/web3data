"use client";

import { CreateProjectForm } from "./CreateProjectForm";
import { useEffect, useState } from "react";
import ProjectCardList from "./ProjectCardList";
import { useAccount } from "wagmi";
import { useCreateProject } from "@/hooks/useCreateProject";
import { DAOIP5ProjectMetadata } from "@/lib/types/daoipTypes";
import { useWriteWeb3ProjectFactoryCreateProjectWithMetadata } from "@/generated";
import { useDeployment } from "@/hooks/useDeployment";
import { Hex, Address } from "viem";
// import { ProjectMetadata } from "@/lib/types/types";


// import { useCreateProject } from "@/hooks/useCreateProject";

export default function ProjectList() {
  const [modalOpen, setModalOpen] = useState(false);

  const { address } = useAccount();

  const { createProject, returnValue } = useCreateProject();
  const { writeContract: createIt } = useWriteWeb3ProjectFactoryCreateProjectWithMetadata({})

  const { deploy } = useDeployment();


  async function handleCreateProject(metadata: DAOIP5ProjectMetadata) {
    if (!address) {
      console.error("Wallet not connected");
      return;
    }
    console.log(`creating project for address: ${address}, name: ${metadata.name}, description: ${metadata.description}`);

    // setModalOpen(false);

    await createProject(address ?? "0x0", 84532, JSON.stringify(metadata));
  }

  useEffect(() => {
    if (returnValue) {
      console.log("Project created successfully:", returnValue);
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
    }
  }, [returnValue]);

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
