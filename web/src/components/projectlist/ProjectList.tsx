"use client";

import { useProjects } from "@/contexts/ProjectContext";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { CreateProject } from "./CreateProject";
import { useState } from "react";
import ProjectCardList from "./ProjectCardList";
import { useReadWeb3ProjectFactoryDebugVerify, useWriteWeb3ProjectFactoryCreateProject, useWriteWeb3ProjectFactoryCreateProjectWithMetadata } from "@/generated";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useDeployment } from "@/hooks/useDeployment";
import { useCreateProject } from "@/hooks/useCreateProject";
import { sign } from "crypto";

export default function ProjectList() {
  //   const { projects, createProject, addContract } = useProjects();
  const [modalOpen, setModalOpen] = useState(false);

  const { deploy } = useDeployment();
  const { address } = useAccount();

  // const { data: hash, error: writeError, writeContract } = useWriteWeb3ProjectFactoryCreateProjectWithMetadata();
  const { data: hash, error: writeError, writeContract } = useWriteWeb3ProjectFactoryCreateProject();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash })

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
    const { metadataCID, signature, timestamp, input } = await createProject(address, name, description);

    console.log("metadataCID", metadataCID);
    console.log("timestamp", timestamp);
    console.log("signature", signature);
    console.log("input", input);

    setDebugMetadataCID(metadataCID);
    setDebugSignature(signature);
    setDebugTimestamp(timestamp);
    setDebugInput(input);

    await writeContract({ address: deploy.Web3ProjectFactory, args: [
      // metadataCID,
      // timestamp,
      // signature,
      // input
    ] });


  }

  const [debugTimestamp, setDebugTimestamp] = useState(0);
  const [debugSignature, setDebugSignature] = useState("");
  const [debugMetadataCID, setDebugMetadataCID] = useState("");
  const [debugInput, setDebugInput] = useState("");

  // const {data} = useReadWeb3ProjectFactoryDebugVerify({
  //   address: deploy.Web3ProjectFactory,
  //   args: [
  //     debugMetadataCID,
  //     debugTimestamp,
  //     debugSignature,
  //     debugInput
  //   ],
  // });

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

      <div>
      <Button
      onClick={() => handleCreateProject("test", "test")}
      >test it</Button>
      <div>CID: {JSON.stringify(debugMetadataCID)}</div>
      <div>SIG: {JSON.stringify(debugSignature)}</div>
      <div>TSX: {JSON.stringify(debugTimestamp)}</div>
      <div>INP: {JSON.stringify(debugInput)}</div>


      </div>
    </section>

  );
}
