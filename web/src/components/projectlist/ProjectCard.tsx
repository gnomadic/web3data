"use client"

import { Web3Project } from "@/lib/types/types";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

type ProjectCardProps = {
    project: Web3Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {

    return (
        <>
            <Link href={`/project/${project.projectAddress}`}>

                <Card
                    className="hover:border-primary cursor-pointer transition"
                >
                    <CardHeader>
                        <CardTitle>{project.metadata?.name}</CardTitle>
                        <CardDescription>
                            {project.metadata?.description }
                            {JSON.stringify(project.metadata, null, 2) || "No description provided."}
                            {/* {project.description || "No description provided."} */}
                        </CardDescription>
                    </CardHeader>
                </Card>
            </Link>
            <LoadingProjectCard />
        </>
    );
}

function LoadingProjectCard() {
    return (
        <Card className="animate-pulse">
            <CardHeader>
                <CardTitle className="h-6 bg-gray-200 rounded w-3/4 mb-2"></CardTitle>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="justify-end w-full flex">
                    <div className="h-4 bg-gray-200 rounded w-1/4 justify-end"></div>
                </div>
            </CardHeader>
        </Card>
    );
}


// import type React from "react"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { ExternalLink, Github, Globe } from "lucide-react"
// import Link from "next/link"

// interface ProjectCardProps {
//   name?: string
//   description?: string
//   icon?: React.ReactNode
//   url?: string
//   githubUrl?: string
//   tags?: string[]
//   status?: "active" | "completed" | "in-progress"
// }

// export default function ProjectCard({
//   name = "E-Commerce Dashboard",
//   description = "A modern dashboard for managing online stores with real-time analytics, inventory tracking, and customer management features.",
//   icon = <Globe className="w-8 h-8" />,
//   url = "https://dashboard.example.com",
//   githubUrl = "https://github.com/username/ecommerce-dashboard",
//   tags = ["React", "Next.js", "TypeScript", "Tailwind"],
//   status = "active",
// }: ProjectCardProps) {
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "active":
//         return "bg-green-100 text-green-800 border-green-200"
//       case "completed":
//         return "bg-blue-100 text-blue-800 border-blue-200"
//       case "in-progress":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200"
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200"
//     }
//   }

//   return (
//     <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-200">
//       <CardHeader className="space-y-4">
//         <div className="flex items-start justify-between">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-muted rounded-lg">{icon}</div>
//             <div className="space-y-1">
//               <CardTitle className="text-xl font-semibold">{name}</CardTitle>
//               <Badge variant="outline" className={`text-xs ${getStatusColor(status)}`}>
//                 {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
//               </Badge>
//             </div>
//           </div>
//         </div>
//         <CardDescription className="text-sm text-muted-foreground leading-relaxed">{description}</CardDescription>
//       </CardHeader>

//       <CardContent className="space-y-4">
//         <div className="flex flex-wrap gap-2">
//           {tags.map((tag, index) => (
//             <Badge key={index} variant="secondary" className="text-xs">
//               {tag}
//             </Badge>
//           ))}
//         </div>
//       </CardContent>

//       <CardFooter className="flex gap-2 pt-4">
//         {url && (
//           <Button asChild variant="default" size="sm" className="flex-1">
//             <Link href={url} target="_blank" rel="noopener noreferrer">
//               <ExternalLink className="w-4 h-4 mr-2" />
//               View Live
//             </Link>
//           </Button>
//         )}
//         {githubUrl && (
//           <Button asChild variant="outline" size="sm" className="flex-1">
//             <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
//               <Github className="w-4 h-4 mr-2" />
//               Code
//             </Link>
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   )
// }