"use client";

import { useProjects } from "@/contexts/ProjectContext";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";

export default function ProjectList() {

    const { projects } = useProjects();


    return (
        <section>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Your Projects</h1>
                <button
                    // onClick={onOpenCreateProject}
                    className="bg-accent hover:bg-accent/70 text-accent-foreground px-4 py-2 rounded-lg font-semibold transition"
                >
                    + New Project
                </button>
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
                    <Card
                        key={index}
                        className="hover:border-primary cursor-pointer transition"
                    // onClick={() => navigate(`/project/${project.id}`)}
                    >
                        <CardHeader>
                            <CardTitle>{project}</CardTitle>
                            <CardDescription>
                                {/* {project.description || "No description provided."} */}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </section>

    );
}