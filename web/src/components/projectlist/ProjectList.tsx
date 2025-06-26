"use client";

import { CreateProjectForm } from "./CreateProjectForm";
import { useState } from "react";
import ProjectCardList from "./ProjectCardList";
import { useAccount } from "wagmi";
import { useCreateProject } from "@/hooks/useCreateProject";
import { ProjectMetadata } from "@/lib/types/types";
// import { useCreateProject } from "@/hooks/useCreateProject";

export default function ProjectList() {
  const [modalOpen, setModalOpen] = useState(false);

  const { address } = useAccount();

  const { createProject } = useCreateProject();


  async function handleCreateProject(metadata: ProjectMetadata) {
    if (!address) {
      console.error("Wallet not connected");
      return;
    }
    console.log(`creating project for address: ${address}, name: ${metadata.name}, description: ${metadata.description}`);

    setModalOpen(false);

    await createProject(address ?? "0x0", 84532, JSON.stringify(metadata));


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
