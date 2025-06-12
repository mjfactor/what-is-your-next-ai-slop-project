"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Code2,
    Database,
    Globe,
    Shield,
    Zap,
    GitBranch,
    ChevronDown,
    ChevronRight,
    Download,
    ExternalLink,
    Clock,
    Users,
    DollarSign,
    Target,
    Settings,
    BookOpen,
    CheckCircle,
    AlertTriangle,
    TrendingUp,
    Rocket,
    FileText,
    TestTube
} from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ProjectResultProps {
    projectName?: string;
    description?: string;
    tagline?: string;
    category?: string;
    projectMetadata?: any;
    techStack?: any;
    architecture?: any;
    developmentPhases?: any[];
    projectStructure?: any;
    recommendations?: any;
    security?: any[];
    testing?: any[];
    performance?: any[];
    deployment?: any[];
    learningResources?: any;
    roadmap?: any;
}

export function ProjectResult({
    projectName = "Untitled Project",
    description = "No description provided",
    tagline,
    category,
    projectMetadata,
    techStack,
    architecture,
    developmentPhases = [],
    projectStructure,
    recommendations,
    security = [],
    testing = [],
    performance = [],
    deployment = [],
    learningResources,
    roadmap
}: ProjectResultProps) {
    const [openSections, setOpenSections] = useState<string[]>(['overview', 'techstack']);

    const handleToggleSection = (section: string) => {
        setOpenSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const isOpen = (section: string) => openSections.includes(section);

    // Technology choice component
    const TechnologyCard = ({ tech, icon, color }: { tech: any, icon: React.ReactNode, color: string }) => {
        if (!tech?.name) return null;

        return (
            <Card className="p-4">
                <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-900/20`}>
                        {icon}
                    </div>
                    <div className="flex-1 space-y-2">
                        <div>
                            <h4 className="font-semibold">{tech.name}</h4>
                            {tech.version && <p className="text-sm text-muted-foreground">v{tech.version}</p>}
                        </div>
                        <p className="text-sm text-muted-foreground">{tech.reasoning}</p>

                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">{tech.learningCurve} Learning</Badge>
                            <Badge variant="outline">{tech.popularity} Popularity</Badge>
                        </div>

                        {tech.alternatives && tech.alternatives.length > 0 && (
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Alternatives considered:</p>
                                <div className="flex flex-wrap gap-1">
                                    {tech.alternatives.slice(0, 3).map((alt: string, i: number) => (
                                        <Badge key={i} variant="secondary" className="text-xs">{alt}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {tech.pros && tech.pros.length > 0 && (
                            <Collapsible>
                                <CollapsibleTrigger className="text-xs text-muted-foreground hover:text-foreground">
                                    View pros & cons
                                </CollapsibleTrigger>
                                <CollapsibleContent className="space-y-2 mt-2">
                                    <div>
                                        <p className="text-xs font-medium text-green-600 dark:text-green-400">Pros:</p>
                                        <ul className="text-xs text-muted-foreground list-disc list-inside">
                                            {tech.pros.slice(0, 3).map((pro: string, i: number) => (
                                                <li key={i}>{pro}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    {tech.cons && tech.cons.length > 0 && (
                                        <div>
                                            <p className="text-xs font-medium text-orange-600 dark:text-orange-400">Cons:</p>
                                            <ul className="text-xs text-muted-foreground list-disc list-inside">
                                                {tech.cons.slice(0, 3).map((con: string, i: number) => (
                                                    <li key={i}>{con}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </CollapsibleContent>
                            </Collapsible>
                        )}
                    </div>
                </div>
            </Card>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-6xl mx-auto space-y-6"
        >
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                <Card className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                    <CardHeader className="relative">
                        <div className="flex items-center gap-2 mb-2">
                            {category && <Badge variant="secondary">{category}</Badge>}
                            {projectMetadata?.complexity && (
                                <Badge variant="outline">{projectMetadata.complexity}</Badge>
                            )}
                        </div>
                        <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
                            {projectName}
                        </CardTitle>
                        {tagline && (
                            <p className="text-lg font-medium text-muted-foreground">{tagline}</p>
                        )}
                        <p className="text-muted-foreground">{description}</p>

                        {/* Quick Stats */}
                        {projectMetadata && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                {projectMetadata.estimatedTimeline?.total && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-blue-500" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Timeline</p>
                                            <p className="text-sm font-medium">{projectMetadata.estimatedTimeline.total}</p>
                                        </div>
                                    </div>
                                )}
                                {projectMetadata.teamSize?.recommended && (
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-green-500" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Team Size</p>
                                            <p className="text-sm font-medium">{projectMetadata.teamSize.recommended} people</p>
                                        </div>
                                    </div>
                                )}
                                {projectMetadata.budget?.total && (
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="w-4 h-4 text-orange-500" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Budget</p>
                                            <p className="text-sm font-medium">{projectMetadata.budget.total}</p>
                                        </div>
                                    </div>
                                )}
                                {projectMetadata.targetAudience && (
                                    <div className="flex items-center gap-2">
                                        <Target className="w-4 h-4 text-purple-500" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Target</p>
                                            <p className="text-sm font-medium">{projectMetadata.targetAudience.split(' ').slice(0, 2).join(' ')}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardHeader>
                </Card>
            </motion.div>

            {/* Navigation */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2">
                        {[
                            { id: 'overview', label: 'Overview', icon: <Target className="w-4 h-4" /> },
                            { id: 'techstack', label: 'Tech Stack', icon: <Code2 className="w-4 h-4" /> },
                            { id: 'architecture', label: 'Architecture', icon: <Settings className="w-4 h-4" /> },
                            { id: 'phases', label: 'Development Phases', icon: <GitBranch className="w-4 h-4" /> },
                            { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
                            { id: 'testing', label: 'Testing', icon: <TestTube className="w-4 h-4" /> },
                            { id: 'resources', label: 'Resources', icon: <BookOpen className="w-4 h-4" /> },
                            { id: 'roadmap', label: 'Roadmap', icon: <Rocket className="w-4 h-4" /> }
                        ].map(({ id, label, icon }) => (
                            <Button
                                key={id}
                                variant={isOpen(id) ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleToggleSection(id)}
                                className="flex items-center gap-2"
                            >
                                {icon}
                                {label}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Project Overview */}
            <Collapsible open={isOpen('overview')}>
                <CollapsibleContent>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="w-5 h-5" />
                                Project Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {projectMetadata?.businessValue && (
                                <div>
                                    <h4 className="font-semibold mb-2">Business Value</h4>
                                    <p className="text-muted-foreground">{projectMetadata.businessValue}</p>
                                </div>
                            )}

                            {projectMetadata?.successMetrics && projectMetadata.successMetrics.length > 0 && (
                                <div>
                                    <h4 className="font-semibold mb-2">Success Metrics</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {projectMetadata.successMetrics.map((metric: string, i: number) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-green-500" />
                                                <span className="text-sm">{metric}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {projectMetadata?.teamSize?.roles && (
                                <div>
                                    <h4 className="font-semibold mb-2">Required Team Roles</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {projectMetadata.teamSize.roles.map((role: string, i: number) => (
                                            <Badge key={i} variant="secondary">{role}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </CollapsibleContent>
            </Collapsible>

            {/* Technology Stack */}
            <Collapsible open={isOpen('techstack')}>
                <CollapsibleContent>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Code2 className="w-5 h-5" />
                                Technology Stack
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {techStack?.frontend && (
                                    <TechnologyCard
                                        tech={techStack.frontend}
                                        icon={<Code2 className="w-5 h-5" />}
                                        color="blue"
                                    />
                                )}
                                {techStack?.backend && (
                                    <TechnologyCard
                                        tech={techStack.backend}
                                        icon={<Database className="w-5 h-5" />}
                                        color="green"
                                    />
                                )}
                                {techStack?.database && (
                                    <TechnologyCard
                                        tech={techStack.database}
                                        icon={<Database className="w-5 h-5" />}
                                        color="orange"
                                    />
                                )}
                                {techStack?.deployment && (
                                    <TechnologyCard
                                        tech={techStack.deployment}
                                        icon={<Globe className="w-5 h-5" />}
                                        color="purple"
                                    />
                                )}
                                {techStack?.authentication && (
                                    <TechnologyCard
                                        tech={techStack.authentication}
                                        icon={<Shield className="w-5 h-5" />}
                                        color="red"
                                    />
                                )}
                                {techStack?.testing && (
                                    <TechnologyCard
                                        tech={techStack.testing}
                                        icon={<TestTube className="w-5 h-5" />}
                                        color="indigo"
                                    />
                                )}
                            </div>

                            {techStack?.additional && techStack.additional.length > 0 && (
                                <div>
                                    <h4 className="font-semibold mb-3">Additional Tools & Services</h4>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {techStack.additional.slice(0, 4).map((tech: any, i: number) => (
                                            <TechnologyCard
                                                key={i}
                                                tech={tech}
                                                icon={<Zap className="w-5 h-5" />}
                                                color="gray"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </CollapsibleContent>
            </Collapsible>

            {/* Architecture */}
            <Collapsible open={isOpen('architecture')}>
                <CollapsibleContent>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="w-5 h-5" />
                                Architecture & Design
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {architecture?.pattern && (
                                <div>
                                    <h4 className="font-semibold mb-2">Architecture Pattern</h4>
                                    <Badge variant="outline" className="mb-2">{architecture.pattern}</Badge>
                                    <p className="text-muted-foreground">{architecture.description}</p>
                                </div>
                            )}

                            {architecture?.components && architecture.components.length > 0 && (
                                <div>
                                    <h4 className="font-semibold mb-2">System Components</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {architecture.components.map((component: string, i: number) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                <span className="text-sm">{component}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {architecture?.designPrinciples && architecture.designPrinciples.length > 0 && (
                                <div>
                                    <h4 className="font-semibold mb-2">Design Principles</h4>
                                    <div className="space-y-2">
                                        {architecture.designPrinciples.map((principle: string, i: number) => (
                                            <div key={i} className="flex items-start gap-2">
                                                <Zap className="w-4 h-4 text-blue-500 mt-0.5" />
                                                <span className="text-sm">{principle}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </CollapsibleContent>
            </Collapsible>

            {/* Development Phases */}
            <Collapsible open={isOpen('phases')}>
                <CollapsibleContent>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GitBranch className="w-5 h-5" />
                                Development Phases
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {developmentPhases.length > 0 ? (
                                <div className="space-y-4">
                                    {developmentPhases.map((phase: any, i: number) => (
                                        <Card key={i} className="p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="font-semibold">{phase.name}</h4>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    {phase.estimatedDays && (
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" />
                                                            {phase.estimatedDays} days
                                                        </span>
                                                    )}
                                                    {phase.estimatedHours && (
                                                        <span>{phase.estimatedHours}h</span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground mb-3">{phase.description}</p>

                                            {phase.deliverables && phase.deliverables.length > 0 && (
                                                <div className="mb-3">
                                                    <p className="text-sm font-medium mb-1">Deliverables:</p>
                                                    <ul className="text-sm text-muted-foreground space-y-1">
                                                        {phase.deliverables.map((deliverable: string, j: number) => (
                                                            <li key={j} className="flex items-center gap-2">
                                                                <CheckCircle className="w-3 h-3 text-green-500" />
                                                                {deliverable}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {phase.risks && phase.risks.length > 0 && (
                                                <div>
                                                    <p className="text-sm font-medium mb-1">Risks:</p>
                                                    <ul className="text-sm text-muted-foreground space-y-1">
                                                        {phase.risks.map((risk: string, j: number) => (
                                                            <li key={j} className="flex items-center gap-2">
                                                                <AlertTriangle className="w-3 h-3 text-orange-500" />
                                                                {risk}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No development phases defined yet.</p>
                            )}
                        </CardContent>
                    </Card>
                </CollapsibleContent>
            </Collapsible>

            {/* Security */}
            <Collapsible open={isOpen('security')}>
                <CollapsibleContent>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                Security Configuration
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {security.length > 0 ? (
                                <div className="space-y-4">
                                    {security.map((secConfig: any, i: number) => (
                                        <Card key={i} className="p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-semibold">{secConfig.category}</h4>
                                                <Badge
                                                    variant={
                                                        secConfig.priority === 'Critical' ? 'destructive' :
                                                            secConfig.priority === 'High' ? 'default' : 'secondary'
                                                    }
                                                >
                                                    {secConfig.priority}
                                                </Badge>
                                            </div>

                                            {secConfig.requirements && (
                                                <div className="mb-3">
                                                    <p className="text-sm font-medium mb-1">Requirements:</p>
                                                    <ul className="text-sm text-muted-foreground space-y-1">
                                                        {secConfig.requirements.slice(0, 3).map((req: string, j: number) => (
                                                            <li key={j} className="flex items-start gap-2">
                                                                <Shield className="w-3 h-3 text-blue-500 mt-1" />
                                                                {req}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {secConfig.tools && secConfig.tools.length > 0 && (
                                                <div>
                                                    <p className="text-sm font-medium mb-1">Recommended Tools:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {secConfig.tools.slice(0, 5).map((tool: string, j: number) => (
                                                            <Badge key={j} variant="outline" className="text-xs">{tool}</Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No security configuration available yet.</p>
                            )}
                        </CardContent>
                    </Card>
                </CollapsibleContent>
            </Collapsible>

            {/* Testing */}
            <Collapsible open={isOpen('testing')}>
                <CollapsibleContent>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TestTube className="w-5 h-5" />
                                Testing Strategy
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {testing.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {testing.map((testStrategy: any, i: number) => (
                                        <Card key={i} className="p-4">
                                            <h4 className="font-semibold mb-2">{testStrategy.type} Testing</h4>
                                            <p className="text-sm text-muted-foreground mb-3">{testStrategy.strategy}</p>

                                            {testStrategy.tools && testStrategy.tools.length > 0 && (
                                                <div className="mb-2">
                                                    <p className="text-xs font-medium mb-1">Tools:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {testStrategy.tools.map((tool: string, j: number) => (
                                                            <Badge key={j} variant="secondary" className="text-xs">{tool}</Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {testStrategy.coverage && (
                                                <div>
                                                    <p className="text-xs font-medium">Target Coverage: {testStrategy.coverage}</p>
                                                </div>
                                            )}
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No testing strategy defined yet.</p>
                            )}
                        </CardContent>
                    </Card>
                </CollapsibleContent>
            </Collapsible>

            {/* Learning Resources */}
            <Collapsible open={isOpen('resources')}>
                <CollapsibleContent>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5" />
                                Learning Resources
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {learningResources ? (
                                <div className="space-y-6">
                                    {['essential', 'recommended', 'advanced'].map((category) => {
                                        const resources = learningResources[category] || [];
                                        if (resources.length === 0) return null;

                                        return (
                                            <div key={category}>
                                                <h4 className="font-semibold mb-3 capitalize">{category} Resources</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {resources.slice(0, 4).map((resource: any, i: number) => (
                                                        <Card key={i} className="p-3">
                                                            <div className="flex items-start justify-between mb-2">
                                                                <h5 className="font-medium text-sm">{resource.title}</h5>
                                                                <div className="flex items-center gap-1">
                                                                    <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                                                                    {resource.isFree && <Badge variant="secondary" className="text-xs">Free</Badge>}
                                                                </div>
                                                            </div>
                                                            <p className="text-xs text-muted-foreground mb-2">{resource.description}</p>
                                                            <div className="flex items-center justify-between">
                                                                <Badge variant="outline" className="text-xs">{resource.difficulty}</Badge>
                                                                {resource.url && (
                                                                    <Button size="sm" variant="ghost" className="text-xs h-6 px-2" asChild>
                                                                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                                                            <ExternalLink className="w-3 h-3" />
                                                                        </a>
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </Card>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No learning resources available yet.</p>
                            )}
                        </CardContent>
                    </Card>
                </CollapsibleContent>
            </Collapsible>

            {/* Roadmap */}
            <Collapsible open={isOpen('roadmap')}>
                <CollapsibleContent>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Rocket className="w-5 h-5" />
                                Implementation Roadmap
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {roadmap?.quickStart && roadmap.quickStart.length > 0 && (
                                <div>
                                    <h4 className="font-semibold mb-3">Quick Start Guide</h4>
                                    <div className="space-y-2">
                                        {roadmap.quickStart.map((step: string, i: number) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                                                    {i + 1}
                                                </div>
                                                <p className="text-sm">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {roadmap?.milestones && roadmap.milestones.length > 0 && (
                                <div>
                                    <h4 className="font-semibold mb-3">Project Milestones</h4>
                                    <div className="space-y-3">
                                        {roadmap.milestones.map((milestone: any, i: number) => (
                                            <Card key={i} className="p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h5 className="font-medium">{milestone.name}</h5>
                                                    <Badge variant="outline">{milestone.timeframe}</Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-3">{milestone.description}</p>
                                                {milestone.deliverables && milestone.deliverables.length > 0 && (
                                                    <div>
                                                        <p className="text-xs font-medium mb-1">Deliverables:</p>
                                                        <div className="flex flex-wrap gap-1">
                                                            {milestone.deliverables.slice(0, 3).map((deliverable: string, j: number) => (
                                                                <Badge key={j} variant="secondary" className="text-xs">{deliverable}</Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {roadmap?.futureEnhancements && roadmap.futureEnhancements.length > 0 && (
                                <div>
                                    <h4 className="font-semibold mb-3">Future Enhancements</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {roadmap.futureEnhancements.map((enhancement: string, i: number) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-green-500" />
                                                <span className="text-sm">{enhancement}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </CollapsibleContent>
            </Collapsible>

            {/* Action Buttons */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-wrap gap-3">
                        <Button className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Export Plan
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Generate Documentation
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                            <Rocket className="w-4 h-4" />
                            Start Project
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>);
}
