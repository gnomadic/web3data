"use client";

import { useReadWeb3ProjectFactoryGetProjects, useReadWeb3ProjectFactoryProjects } from '@/generated';
import { useDeployment } from '@/hooks/useDeployment';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Address } from 'viem';

interface ProjectContextProps {
    projects: readonly Address[] | undefined;
    updateProjects: () => void;
}

const ProjectContext = createContext<ProjectContextProps>({
    projects: [],
    updateProjects: () => { },
});

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const { deploy } = useDeployment();
    const { data: projects, isLoading, isError, error, refetch: updateProjects } = useReadWeb3ProjectFactoryGetProjects({
        address: deploy?.Web3ProjectFactory,
        // address: "0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496"
    });

    return (
        <ProjectContext.Provider value={{ projects: projects, updateProjects }}>
            <div>okok {JSON.stringify(deploy?.Web3ProjectFactory)}</div>
            <div>okok {JSON.stringify(projects)}</div>
            <div>okok loading: {JSON.stringify(isLoading)}</div>
            <div>okok error: {JSON.stringify(isError)}</div>
            <div>okok error: {JSON.stringify(error)}</div>
            {children}
        </ProjectContext.Provider>
    );
};

// Create a hook for easy context consumption
export const useProjects = () => useContext(ProjectContext);
