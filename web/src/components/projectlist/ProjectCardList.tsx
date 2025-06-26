"use client";

import { useProjects } from "@/contexts/ProjectContext";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";


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

                // className="bg-accent hover:bg-accent/70 text-accent-foreground px-4 py-2 rounded-lg font-semibold transition"
                >
                    + New Project
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card
                    key={1}
                    className="hover:border-primary cursor-pointer transition"
                // onClick={() => navigate(`/project/${project.id}`)}
                >
                    <CardHeader>
                        <CardTitle>ok</CardTitle>
                        <CardDescription>
                            {/* {project.description || "No description provided."} */}
                        </CardDescription>
                    </CardHeader>
                </Card>
                {projects?.map((project, index) => (
                    <Link key={index} href={`/project/${project.projectAddress}`}>

                        <Card

                            className="hover:border-primary cursor-pointer transition"
                        // onClick={() => navigate(`/project/${project.id}`)}
                        >
                            <CardHeader>
                                <CardTitle>{project.projectAddress}</CardTitle>
                                <CardDescription>
                                    {JSON.stringify(project.metadata, null, 2) || "No description provided."}
                                    {/* {project.description || "No description provided."} */}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>

    );
}
