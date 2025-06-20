"use client";

import { useProjects } from "@/contexts/ProjectContext";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { CreateProject } from "./CreateProject";
import { useState } from "react";
import ProjectCardList from "./ProjectCardList";
import { useWriteWeb3ProjectFactoryCreateProject } from "@/generated";
import { useWaitForTransactionReceipt } from "wagmi";
import { useDeployment } from "@/hooks/useDeployment";

export default function ProjectList() {
//   const { projects, createProject, addContract } = useProjects();
  const [modalOpen, setModalOpen] = useState(false);

  const { deploy } = useDeployment();

    const { data: hash, error: writeError, writeContract } = useWriteWeb3ProjectFactoryCreateProject();
  const { isLoading, isSuccess, data } = useWaitForTransactionReceipt({ hash })

  

        //   onClick={() => {
        //           console.log("Accept Assignment button clicked");
        //           writeContract({ address: deploy.Planet, args: [address!] });
        //         }}

  function handleCreateProject(name: string, description: string) {
    // const newProject = createProject(name, description);
    setModalOpen(false);
    writeContract({ address: deploy.Web3ProjectFactory, args: [] });
    // navigate(`/project/${newProject.id}`);
  }
    
    return (
        <section>
            <div>hash: {hash}</div>
            <div>writeError: {JSON.stringify(writeError)}</div>
            <div>isLoading: {JSON.stringify(isLoading)}</div>
            <div>isSuccess: {JSON.stringify(isSuccess)}</div>
            <ProjectCardList
                openCreateProject={() => setModalOpen(true)}
            />
            <CreateProject
                open={modalOpen}
                onOpenChange={setModalOpen}
                onCreate={handleCreateProject}
            
            />
        </section>

    );
}
