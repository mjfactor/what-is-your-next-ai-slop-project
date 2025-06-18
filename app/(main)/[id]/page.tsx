"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ProjectHeader } from '@/components/project/project-header';
import { ProjectTechStack } from '@/components/project/project-tech-stack';
import { ProjectArchitectureCard } from '@/components/project/project-architecture';
import { ProjectPhases } from '@/components/project/project-phases';
import { ProjectRisksAndRecommendations } from '@/components/project/project-risks-recommendations';
import { ProjectResourcesCard } from '@/components/project/project-resources';
import { ApiResponse } from '@/types/project';

export default function ProjectDetailPage() {
    const params = useParams();
    const projectId = params.id as string;
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [projectData, setProjectData] = useState<ApiResponse | null>(null);

    useEffect(() => {
        const getProject = async () => {
            if (!projectId) return;
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`/api/fetch-project-with-id`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: projectId }),
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch project');
                }
                setProjectData(data);
            } catch (error) {
                console.error("Error fetching project:", error);
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        getProject();
    }, [projectId]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <Card>
                            <CardContent className="p-8">
                                <div className="animate-pulse space-y-4">
                                    <div className="h-8 bg-muted rounded w-3/4"></div>
                                    <div className="h-4 bg-muted rounded w-full"></div>
                                    <div className="h-4 bg-muted rounded w-5/6"></div>
                                </div>
                            </CardContent>
                        </Card>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                                <Card key={i}>
                                    <CardContent className="p-6">
                                        <div className="animate-pulse space-y-2">
                                            <div className="h-4 bg-muted rounded w-1/2"></div>
                                            <div className="h-8 bg-muted rounded w-3/4"></div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <Alert className="border-red-200 dark:border-red-800">
                        <AlertDescription className="text-red-800 dark:text-red-300">
                            {error}
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        );
    }

    if (!projectData || !projectData.generated_content) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <Alert>
                        <AlertDescription>
                            No project data found.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        );
    }

    const project = projectData.generated_content;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <ProjectHeader
                        projectName={project.projectName}
                        projectDescription={project.projectDescription}
                        metadata={project.metadata}
                        createdAt={projectData.created_at}
                    />                    <Tabs defaultValue="overview" className="w-full">
                        <div className="overflow-x-auto">
                            <TabsList className="grid w-full grid-cols-6 min-w-[600px] md:min-w-0">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="tech-stack">Tech Stack</TabsTrigger>
                                <TabsTrigger value="architecture">Architecture</TabsTrigger>
                                <TabsTrigger value="phases">Phases</TabsTrigger>
                                <TabsTrigger value="insights">Insights</TabsTrigger>
                                <TabsTrigger value="resources">Resources</TabsTrigger>
                            </TabsList>
                        </div>                        <TabsContent value="overview" className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <ProjectArchitectureCard architecture={project.architecture} />
                                    <ProjectPhases phases={project.developmentPhases} />
                                </div>
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="tech-stack">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProjectTechStack techStack={project.techStack} />
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="architecture">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProjectArchitectureCard architecture={project.architecture} />
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="phases">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProjectPhases phases={project.developmentPhases} />
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="insights">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProjectRisksAndRecommendations
                                    risks={project.risks}
                                    recommendations={project.recommendations}
                                    reasoning={project.reasoning}
                                />
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="resources">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProjectResourcesCard resources={project.resources} />
                            </motion.div>
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </div>
        </div>
    );
}