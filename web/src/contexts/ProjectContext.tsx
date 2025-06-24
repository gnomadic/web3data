"use client";

import { useReadWeb3ProjectFactoryGetProjects } from '@/generated';
import { useDeployment } from '@/hooks/useDeployment';
import React, { createContext, useContext, ReactNode } from 'react';
import { Address, ReadContractErrorType } from 'viem';

interface ProjectContextProps {
    projects: readonly Address[] | undefined;
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
    });

    return (
        <ProjectContext.Provider value={{
            projects: projects,
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
