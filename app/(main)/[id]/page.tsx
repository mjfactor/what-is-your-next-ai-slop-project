"use client";

import React, { useState, useEffect } from 'react'
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Clock, Users, Code, Zap, Shield, TestTube, AlertTriangle, ExternalLink, ChevronRight } from "lucide-react";

// TypeScript interfaces
interface TechStackItem {
    name: string;
    reasoning: string;
    difficulty?: string;
    keyBenefits?: string;
    alternatives?: string;
    costCategory: string;
    communitySupport?: string;
}

interface Risk {
    severity?: string;
    mitigation: string;
    description?: string;
}

interface Phase {
    name?: string;
    description: string;
}

interface Resource {
    url?: string;
    title?: string;
    description?: string;
}

interface ProjectContext {
    teamSize: string;
    experienceLevel: string;
    timeline: string;
}

interface Architecture {
    pattern: string;
    description: string;
    integrationStrategy?: string;
}

interface LearningPath {
    prerequisites: string;
    studyOrder: string;
}

interface ProjectData {
    id: string;
    generated_content: {
        projectName: string;
        description: string;
        category: string;
        complexity: string;
        context: ProjectContext;
        techStack: {
            frontend?: TechStackItem;
            backend?: TechStackItem;
            database?: TechStackItem;
            deployment?: TechStackItem;
            ai?: TechStackItem;
            [key: string]: TechStackItem | undefined;
        };
        architecture: Architecture;
        phases: Phase[];
        learningPath: LearningPath;
        bestPractices: string;
        security: string;
        testing: string;
        performance: string;
        risks: Risk[];
        resources: Resource[];
        roadmap?: {
            mustDo?: string[];
            optional?: string[];
            [key: string]: any;
        };
    };
    project_idea: string | null;
    created_at: string;
}

interface ApiResponse {
    error?: string;
    id?: string;
    generated_content?: any;
    project_idea?: string | null;
    created_at?: string;
}

const TechStackCard: React.FC<{ title: string; item: TechStackItem }> = ({ title, item }) => (
    <Card className="h-full">
        <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{title}</CardTitle>
                <Badge variant="outline" className="text-xs">
                    {item.costCategory}
                </Badge>
            </div>
            <CardDescription className="font-medium text-base">
                {item.name}
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
            {item.difficulty && (
                <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                        <strong>Difficulty:</strong> {item.difficulty}
                    </span>
                </div>
            )}

            <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                    <strong>Why chosen:</strong> {item.reasoning}
                </p>

                {item.keyBenefits && (
                    <p className="text-sm text-muted-foreground">
                        <strong>Key benefits:</strong> {item.keyBenefits}
                    </p>
                )}

                {item.alternatives && (
                    <p className="text-sm text-muted-foreground">
                        <strong>Alternatives:</strong> {item.alternatives}
                    </p>
                )}

                {item.communitySupport && (
                    <p className="text-sm text-muted-foreground">
                        <strong>Community:</strong> {item.communitySupport}
                    </p>
                )}
            </div>
        </CardContent>
    </Card>
);

const RiskCard: React.FC<{ risk: Risk; index: number }> = ({ risk, index }) => (
    <Alert className={risk.severity === 'High' ? 'border-destructive' : risk.severity === 'Medium' ? 'border-orange-500' : 'border-muted'}>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle className="flex items-center gap-2">
            Risk #{index + 1}
            {risk.severity && (
                <Badge variant={risk.severity === 'High' ? 'destructive' : 'secondary'} className="text-xs">
                    {risk.severity}
                </Badge>
            )}
        </AlertTitle>
        <AlertDescription className="mt-2 space-y-2">
            {risk.description && (
                <p className="text-sm"><strong>Issue:</strong> {risk.description}</p>
            )}
            <p className="text-sm"><strong>Mitigation:</strong> {risk.mitigation}</p>
        </AlertDescription>
    </Alert>
);

export default function ProjectDetailPage() {
    const params = useParams();
    const projectId = params.id as string;
    const [project, setProject] = useState<ProjectData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

                const data: ApiResponse = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch project');
                }

                if (data.id && data.generated_content) {
                    setProject({
                        id: data.id,
                        generated_content: data.generated_content,
                        project_idea: data.project_idea || null,
                        created_at: data.created_at || new Date().toISOString(),
                    });
                } else {
                    throw new Error('Invalid project data received');
                }
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
            <main className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="h-8 bg-muted rounded-lg animate-pulse" />
                        <div className="h-4 bg-muted rounded-lg animate-pulse w-3/4" />
                        <div className="flex gap-2">
                            <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
                            <div className="h-6 w-24 bg-muted rounded-full animate-pulse" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
                        ))}
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="container mx-auto px-4 py-8 max-w-7xl">
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </main>
        );
    }

    if (!project?.generated_content) {
        return (
            <main className="container mx-auto px-4 py-8 max-w-7xl">
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Project Not Found</AlertTitle>
                    <AlertDescription>The requested project could not be found.</AlertDescription>
                </Alert>
            </main>
        );
    }

    const { generated_content: content } = project;

    return (
        <main className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="space-y-8">
                {/* Header Section */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold tracking-tight">{content.projectName}</h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {content.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Badge variant="default" className="px-3 py-1">
                                {content.category}
                            </Badge>
                            <Badge variant="outline" className="px-3 py-1">
                                {content.complexity}
                            </Badge>
                            {project.project_idea && (
                                <Badge variant="secondary" className="px-3 py-1">
                                    Idea: {project.project_idea}
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Context Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-primary" />
                                    <CardTitle className="text-base">Team Size</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-semibold">{content.context.teamSize}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-primary" />
                                    <CardTitle className="text-base">Timeline</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-semibold">{content.context.timeline}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-2">
                                    <Code className="h-5 w-5 text-primary" />
                                    <CardTitle className="text-base">Experience Level</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-semibold">{content.context.experienceLevel}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Main Content Tabs */}
                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="techstack">Tech Stack</TabsTrigger>
                        <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                        <TabsTrigger value="learning">Learning</TabsTrigger>
                        <TabsTrigger value="risks">Risks</TabsTrigger>
                        <TabsTrigger value="resources">Resources</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Code className="h-5 w-5" />
                                        Architecture
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Badge variant="outline" className="mb-2">
                                            {content.architecture.pattern}
                                        </Badge>
                                        <p className="text-sm text-muted-foreground">
                                            {content.architecture.description}
                                        </p>
                                    </div>
                                    {content.architecture.integrationStrategy && (
                                        <div>
                                            <h4 className="font-medium mb-1">Integration Strategy</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {content.architecture.integrationStrategy}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Shield className="h-5 w-5" />
                                        Best Practices
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {content.bestPractices}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        <Accordion type="single" collapsible className="space-y-2">
                            <AccordionItem value="security">
                                <AccordionTrigger className="text-left">
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-4 w-4" />
                                        Security Considerations
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {content.security}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="testing">
                                <AccordionTrigger className="text-left">
                                    <div className="flex items-center gap-2">
                                        <TestTube className="h-4 w-4" />
                                        Testing Strategy
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {content.testing}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="performance">
                                <AccordionTrigger className="text-left">
                                    <div className="flex items-center gap-2">
                                        <Zap className="h-4 w-4" />
                                        Performance Optimization
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {content.performance}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </TabsContent>

                    {/* Tech Stack Tab */}
                    <TabsContent value="techstack" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Object.entries(content.techStack).map(([key, item]) => {
                                if (!item) return null;
                                return (
                                    <TechStackCard
                                        key={key}
                                        title={key.charAt(0).toUpperCase() + key.slice(1)}
                                        item={item}
                                    />
                                );
                            })}
                        </div>
                    </TabsContent>

                    {/* Roadmap Tab */}
                    <TabsContent value="roadmap" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Development Phases</CardTitle>
                                <CardDescription>
                                    Step-by-step roadmap for building your project
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {content.phases.map((phase, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                                                    {index + 1}
                                                </div>
                                                {index < content.phases.length - 1 && (
                                                    <div className="w-px h-12 bg-border mt-2" />
                                                )}
                                            </div>
                                            <div className="flex-1 pb-8">
                                                {phase.name && (
                                                    <h4 className="font-medium mb-1">{phase.name}</h4>
                                                )}
                                                <p className="text-sm text-muted-foreground">
                                                    {phase.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {content.roadmap && (content.roadmap.mustDo || content.roadmap.optional) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {content.roadmap.mustDo && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Must Do</CardTitle>
                                            <CardDescription>Essential tasks for project completion</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {content.roadmap.mustDo.map((item, index) => (
                                                    <li key={index} className="flex items-start gap-2 text-sm">
                                                        <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                )}

                                {content.roadmap.optional && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Optional</CardTitle>
                                            <CardDescription>Additional features and enhancements</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {content.roadmap.optional.map((item, index) => (
                                                    <li key={index} className="flex items-start gap-2 text-sm">
                                                        <ChevronRight className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        )}
                    </TabsContent>

                    {/* Learning Tab */}
                    <TabsContent value="learning" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Prerequisites</CardTitle>
                                    <CardDescription>What you need to know before starting</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {content.learningPath.prerequisites}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Study Order</CardTitle>
                                    <CardDescription>Recommended learning sequence</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {content.learningPath.studyOrder}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Risks Tab */}
                    <TabsContent value="risks" className="space-y-6">
                        <div className="space-y-4">
                            {content.risks.map((risk, index) => (
                                <RiskCard key={index} risk={risk} index={index} />
                            ))}
                        </div>
                    </TabsContent>

                    {/* Resources Tab */}
                    <TabsContent value="resources" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {content.resources.map((resource, index) => (
                                <Card key={index} className="group hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <CardTitle className="text-base leading-tight">
                                                {resource.title || `Resource ${index + 1}`}
                                            </CardTitle>
                                            {resource.url && (
                                                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {resource.description && (
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {resource.description}
                                            </p>
                                        )}
                                        {resource.url && (
                                            <Button variant="outline" size="sm" className="w-full" asChild>
                                                <a
                                                    href={resource.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2"
                                                >
                                                    Visit Resource
                                                    <ExternalLink className="h-3 w-3" />
                                                </a>
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
}