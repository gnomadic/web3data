import type React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Web3Project } from "@/lib/types/types"
import { Avatar } from "../global/Avatar"

interface ProjectCardProps {
    // icon?: React.ReactNode
    tags?: string[]
    status?: "active" | "completed" | "in-progress"
    project : Web3Project
}

export default function ProjectCard({
    // icon = <Globe className="w-8 h-8" />,
    tags = ["React", "Next.js", "TypeScript", "Tailwind"],
    status = "active",
    project
}: ProjectCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800 border-green-200"
            case "completed":
                return "bg-blue-100 text-blue-800 border-blue-200"
            case "in-progress":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    return (
        <Link href={`/project/${project.projectAddress}`}>
                    
            <Card className="w-full max-h-64 min-h-64 hover:border-primary transition cursor-pointer relative">
                <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            {/* <div className="p-2 bg-muted">{icon}</div> */}
                                        <Avatar fallbackName={project?.metadata?.name} />
                            
                            <div className="space-y-1">
                                <CardTitle className="text-xl font-semibold line-clamp-1 overflow-ellipsis">{project.metadata?.name}</CardTitle>
                                <Badge variant="outline" className={`text-xs ${getStatusColor(status)}`}>
                                    {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-4 overflow-ellipsis">{project.metadata?.description}</CardDescription>
                </CardHeader>

                <CardFooter className="space-y-4 absolute bottom-4 left-0">
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardFooter>

                {/* <CardFooter className="flex gap-2 pt-4">
                    {url && (
                        <Button asChild variant="default" size="sm" className="flex-1">
                            <Link href={url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Live
                            </Link>
                        </Button>
                    )}
                    {githubUrl && (
                        <Button asChild variant="outline" size="sm" className="flex-1">
                            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2" />
                                Code
                            </Link>
                        </Button>
                    )}
                </CardFooter> */}
            </Card>
         </Link>
    )
}
