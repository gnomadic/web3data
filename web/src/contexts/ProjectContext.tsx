"use client";

import { useReadWeb3ProjectFactoryGetProjects } from '@/generated';
import { useDeployment } from '@/hooks/useDeployment';
import useGetBatchIPFS from '@/hooks/useGetBatchIPFS';
import { BatchIPFSResponse, Web3Project } from '@/lib/types/types';
import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { ReadContractErrorType } from 'viem';

interface ProjectContextProps {
    projects: Web3Project[];
    projectsLoading: boolean;
    projectsError: boolean;
    projectsErrorMessage: ReadContractErrorType | null;
    updateProjects: () => void;
}

const ProjectContext = createContext<ProjectContextProps>({
    projects: [],
    projectsLoading: false,
    projectsError: false,
    projectsErrorMessage: null,
    updateProjects: () => { },
});

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const { deploy } = useDeployment();
    const { data: projects, isLoading, isError, error, refetch: updateProjects } = useReadWeb3ProjectFactoryGetProjects({
        address: deploy?.Web3ProjectFactory,
        args: [BigInt(0), BigInt(10)]
    })

    const [web3Projects, setWeb3Projects] = useState<Web3Project[]>([]);  
    const [allCids, setAllCids] = useState<string[]>([]);

    const {data: ipfs } = useGetBatchIPFS<BatchIPFSResponse>(allCids);



    useEffect(() => {
        console.log('Projects updated');
        if (!projects || web3Projects.length != 0) {
            console.log('No projects found');
            setWeb3Projects([]);
            return;
        }
        const cids = projects.map((project) => project.metadataCID);
        setAllCids(cids);
        setWeb3Projects(projects?.map((project) => ({
            projectAddress: project.projectAddress,
            timestamp: project.timestamp,
            metadataCID: project.metadataCID,
            
        })));

    }, [projects])

        //     content: content,
        // cids: cids.split(','),
    useEffect(() => {
        if (!ipfs) return;
        // const updatedProjects = web3Projects.map((project, index) => ({
        //     ...project,
        //     metadata: ipfs[index] ? JSON.parse(ipfs[index]) : null,
        // }));
        const updatedProjects = web3Projects.map((project) => {
            const cidIndex = ipfs.cids.findIndex((cid) => cid === project.metadataCID);
            console.log('CID Index:', cidIndex, 'for project:', project.projectAddress);
            console.log(ipfs.content[cidIndex]);
            console.log(ipfs.content[cidIndex]?.metadata);
            return {
                ...project,
                metadata: cidIndex !== -1 ? JSON.parse(ipfs.content[cidIndex]?.metadata) : undefined,
            };
            // return {
            //     ...project,
            //     metadata: ipfsData ? (ipfsData.) : undefined,
            // };
        });


        setWeb3Projects(updatedProjects);
    }, [ipfs]);
    


    return (
        <ProjectContext.Provider value={{
            projects: web3Projects,
            projectsLoading: isLoading,
            projectsError: isError,
            projectsErrorMessage: error,
            updateProjects
        }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjects = () => useContext(ProjectContext);
