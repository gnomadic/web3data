"use client";

import { useProjects } from "@/contexts/ProjectContext";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import ProjectCard2 from "./ProjectCard2";


type Props = {
    openCreateProject: () => void;

};

export default function ProjectCardList({ openCreateProject }: Props) {

    const { projects } = useProjects();

    return (
        <section>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold font-text">Projects</h1>
                <Button
                    className="font-text"
                    variant={"secondary"}
                    onClick={openCreateProject}
                >
                    + New Project
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects?.map((project, index) => (
                    <ProjectCard2 key={index} project={project} />
                ))}

            </div>
        </section>

    );
}
