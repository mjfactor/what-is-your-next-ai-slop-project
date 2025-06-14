"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProjectStructureSchema } from "@/lib/schema/let-ai-decide-schema";
import { z } from "zod";

// Extract the TypeScript type from the Zod schema
type ProjectStructure = z.infer<typeof ProjectStructureSchema>;
// Define a type that can handle the partial streaming objects
type StreamingProjectStructureType = any;  // Using any temporarily to handle streaming objects

// Animation variants for sections
const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

// Component to display a loading placeholder
const LoadingPlaceholder = () => (
    <div className="animate-pulse space-y-3">
        <div className="h-4 bg-primary/10 rounded w-3/4"></div>
        <div className="h-4 bg-primary/10 rounded w-1/2"></div>
        <div className="h-4 bg-primary/10 rounded w-5/6"></div>
    </div>
);

// Component for tech choices
const TechChoiceCard = ({
    title,
    tech,
}: {
    title: string;
    tech: ProjectStructure["techStack"]["frontend"] | undefined;
}) => {
    if (!tech) return null;

    return (
        <Card className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-medium">{title}: {tech.name}</h3>
                <Badge variant="outline" className="bg-primary/5">
                    {tech.difficulty}
                </Badge>
            </div>
            {tech.reasoning && <p className="text-sm text-muted-foreground mb-2">{tech.reasoning}</p>}
            {tech.keyBenefits && (
                <div className="mt-2">
                    <p className="text-xs font-medium text-foreground/70">Key Benefits:</p>
                    <p className="text-sm">{tech.keyBenefits}</p>
                </div>
            )}
            {tech.alternatives && (
                <div className="mt-2">
                    <p className="text-xs font-medium text-foreground/70">Alternatives Considered:</p>
                    <p className="text-sm">{tech.alternatives}</p>
                </div>
            )}
            {tech.communitySupport && (
                <div className="mt-2">
                    <p className="text-xs font-medium text-foreground/70">Community Support:</p>
                    <p className="text-sm">{tech.communitySupport}</p>
                </div>
            )}
            {tech.costCategory && (
                <div className="mt-2">
                    <span className="text-xs bg-primary/10 text-foreground/80 px-2 py-1 rounded-full">
                        {tech.costCategory}
                    </span>
                </div>
            )}
        </Card>
    );
};

// Component for resources
const ResourceCard = ({ resource }: { resource: ProjectStructure["resources"][0] }) => {
    return (
        <Card className="p-3 border-border/50 bg-background/80 backdrop-blur-sm">
            <h3 className="text-sm font-medium">{resource.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
            {resource.url && (
                <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline mt-2 inline-block"
                >
                    View Documentation
                </a>
            )}
        </Card>
    );
};

// Component for phases
const PhaseItem = ({ phase }: { phase: ProjectStructure["phases"][0] }) => {
    return (
        <div className="mb-3">
            <h3 className="text-sm font-medium">{phase.name}</h3>
            <p className="text-xs text-muted-foreground">{phase.description}</p>
        </div>
    );
};

// Main component
export const StreamingProjectStructure = ({
    projectStructure,
}: {
    projectStructure: StreamingProjectStructureType;
}) => {
    if (!projectStructure) return null;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Basic Project Information */}
            {(projectStructure.projectName || projectStructure.description || projectStructure.category) && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    transition={{ duration: 0.5 }}
                    className="space-y-2"
                >
                    <h2 className="text-2xl font-bold">Project Overview</h2>
                    <Card className="p-6 border-border/50 bg-background/80 backdrop-blur-sm">
                        {projectStructure.projectName && (
                            <h3 className="text-xl font-semibold mb-2">{projectStructure.projectName}</h3>
                        )}
                        {projectStructure.description && (
                            <p className="text-muted-foreground mb-4">{projectStructure.description}</p>
                        )}
                        <div className="flex flex-wrap gap-2">
                            {projectStructure.category && (
                                <Badge variant="outline">{projectStructure.category}</Badge>
                            )}
                            {projectStructure.complexity && (
                                <Badge variant="outline" className="bg-primary/5">
                                    {projectStructure.complexity} Complexity
                                </Badge>
                            )}
                        </div>
                    </Card>
                </motion.div>
            )}

            {/* Context Information */}
            {projectStructure.context && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-2"
                >
                    <h2 className="text-xl font-bold">Project Context</h2>
                    <Card className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {projectStructure.context.teamSize && (
                                <div>
                                    <p className="text-sm font-medium">Team Size</p>
                                    <p className="text-sm text-muted-foreground">{projectStructure.context.teamSize}</p>
                                </div>
                            )}
                            {projectStructure.context.experienceLevel && (
                                <div>
                                    <p className="text-sm font-medium">Experience Level</p>
                                    <p className="text-sm text-muted-foreground">{projectStructure.context.experienceLevel}</p>
                                </div>
                            )}
                            {projectStructure.context.timeline && (
                                <div>
                                    <p className="text-sm font-medium">Timeline</p>
                                    <p className="text-sm text-muted-foreground">{projectStructure.context.timeline}</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </motion.div>
            )}

            {/* Technology Stack */}
            {projectStructure.techStack && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-2"
                >
                    <h2 className="text-xl font-bold">Technology Stack</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TechChoiceCard title="Frontend" tech={projectStructure.techStack?.frontend} />
                        <TechChoiceCard title="Backend" tech={projectStructure.techStack?.backend} />
                        <TechChoiceCard title="Database" tech={projectStructure.techStack?.database} />
                        <TechChoiceCard title="Deployment" tech={projectStructure.techStack?.deployment} />
                        <TechChoiceCard title="AI Integration" tech={projectStructure.techStack?.ai} />
                    </div>
                </motion.div>
            )}

            {/* Architecture */}
            {projectStructure.architecture && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="space-y-2"
                >
                    <h2 className="text-xl font-bold">Architecture</h2>
                    <Card className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
                        {projectStructure.architecture.pattern && (
                            <div className="mb-3">
                                <p className="text-base font-medium">{projectStructure.architecture.pattern}</p>
                            </div>
                        )}
                        {projectStructure.architecture.description && (
                            <p className="text-sm text-muted-foreground">{projectStructure.architecture.description}</p>
                        )}
                        {projectStructure.architecture.integrationStrategy && (
                            <div className="mt-3">
                                <p className="text-sm font-medium">Integration Strategy:</p>
                                <p className="text-sm text-muted-foreground">{projectStructure.architecture.integrationStrategy}</p>
                            </div>
                        )}
                    </Card>
                </motion.div>
            )}

            {/* Development Phases */}
            {projectStructure.phases && projectStructure.phases.length > 0 && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="space-y-2"
                >
                    <h2 className="text-xl font-bold">Development Phases</h2>
                    <Card className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
                        <div className="space-y-4">              {projectStructure.phases.map((phase: any, index: number) => (
                            <div key={index} className="relative">
                                <PhaseItem phase={phase} />
                                {index < projectStructure.phases!.length - 1 && (
                                    <Separator className="my-2" />
                                )}
                            </div>
                        ))}
                        </div>
                    </Card>
                </motion.div>
            )}

            {/* Learning Path */}
            {projectStructure.learningPath && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="space-y-2"
                >
                    <h2 className="text-xl font-bold">Learning Path</h2>
                    <Card className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
                        {projectStructure.learningPath.prerequisites && (
                            <div className="mb-3">
                                <p className="text-sm font-medium">Prerequisites:</p>
                                <p className="text-sm text-muted-foreground">{projectStructure.learningPath.prerequisites}</p>
                            </div>
                        )}
                        {projectStructure.learningPath.studyOrder && (
                            <div>
                                <p className="text-sm font-medium">Recommended Study Order:</p>
                                <p className="text-sm text-muted-foreground">{projectStructure.learningPath.studyOrder}</p>
                            </div>
                        )}
                    </Card>
                </motion.div>
            )}

            {/* Best Practices */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="space-y-2"
            >
                <h2 className="text-xl font-bold">Best Practices & Recommendations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projectStructure.bestPractices ? (
                        <Card className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
                            <p className="text-sm font-medium">Development Best Practices</p>
                            <p className="text-sm text-muted-foreground">{projectStructure.bestPractices}</p>
                        </Card>
                    ) : (
                        <Card className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
                            <p className="text-sm font-medium">Development Best Practices</p>
                            <LoadingPlaceholder />
                        </Card>
                    )}

                    {projectStructure.security ? (
                        <Card className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
                            <p className="text-sm font-medium">Security Considerations</p>
                            <p className="text-sm text-muted-foreground">{projectStructure.security}</p>
                        </Card>
                    ) : (
                        <Card className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
                            <p className="text-sm font-medium">Security Considerations</p>
                            <LoadingPlaceholder />
                        </Card>
                    )}

                    {projectStructure.testing ? (
                        <Card className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
                            <p className="text-sm font-medium">Testing Strategy</p>
                            <p className="text-sm text-muted-foreground">{projectStructure.testing}</p>
                        </Card>
                    ) : (
                        <Card className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
                            <p className="text-sm font-medium">Testing Strategy</p>
                            <LoadingPlaceholder />
                        </Card>
                    )}

                    {projectStructure.performance ? (
                        <Card className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
                            <p className="text-sm font-medium">Performance Optimization</p>
                            <p className="text-sm text-muted-foreground">{projectStructure.performance}</p>
                        </Card>
                    ) : (
                        <Card className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
                            <p className="text-sm font-medium">Performance Optimization</p>
                            <LoadingPlaceholder />
                        </Card>
                    )}
                </div>
            </motion.div>

            {/* Risks */}
            {projectStructure.risks && projectStructure.risks.length > 0 && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="space-y-2"
                >
                    <h2 className="text-xl font-bold">Risk Assessment</h2>
                    <div className="grid grid-cols-1 gap-4">            {projectStructure.risks.map((risk: any, index: number) => (
                        <Card key={index} className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
                            <div className="flex justify-between items-start">
                                <p className="text-sm font-medium">{risk.description}</p>
                                <Badge
                                    variant={
                                        risk.severity === "High" ? "destructive" :
                                            risk.severity === "Medium" ? "outline" : "secondary"
                                    }
                                >
                                    {risk.severity} Risk
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                                <span className="font-medium">Mitigation:</span> {risk.mitigation}
                            </p>
                        </Card>
                    ))}
                    </div>
                </motion.div>
            )}

            {/* Resources */}
            {projectStructure.resources && projectStructure.resources.length > 0 && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="space-y-2"
                >
                    <h2 className="text-xl font-bold">Documentation Resources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">            {projectStructure.resources.map((resource: any, index: number) => (
                        <ResourceCard key={index} resource={resource} />
                    ))}
                    </div>
                </motion.div>
            )}

            {/* Implementation Roadmap */}
            {projectStructure.roadmap && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="space-y-2"
                >
                    <h2 className="text-xl font-bold">Implementation Roadmap</h2>
                    <div className="space-y-4">
                        {projectStructure.roadmap.gettingStarted && (
                            <Card className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
                                <p className="text-sm font-medium">Getting Started</p>
                                <p className="text-sm text-muted-foreground">{projectStructure.roadmap.gettingStarted}</p>
                            </Card>
                        )}

                        {projectStructure.roadmap.foundationPhase && (
                            <Card className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
                                <p className="text-sm font-medium">Foundation Phase</p>
                                <p className="text-sm text-muted-foreground">{projectStructure.roadmap.foundationPhase}</p>
                            </Card>
                        )}

                        {projectStructure.roadmap.coreDevPhase && (
                            <Card className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
                                <p className="text-sm font-medium">Core Development Phase</p>
                                <p className="text-sm text-muted-foreground">{projectStructure.roadmap.coreDevPhase}</p>
                            </Card>
                        )}

                        {projectStructure.roadmap.integrationPhase && (
                            <Card className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
                                <p className="text-sm font-medium">Integration Phase</p>
                                <p className="text-sm text-muted-foreground">{projectStructure.roadmap.integrationPhase}</p>
                            </Card>
                        )}

                        {projectStructure.roadmap.testingPhase && (
                            <Card className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
                                <p className="text-sm font-medium">Testing Phase</p>
                                <p className="text-sm text-muted-foreground">{projectStructure.roadmap.testingPhase}</p>
                            </Card>
                        )}

                        {projectStructure.roadmap.deploymentPhase && (
                            <Card className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
                                <p className="text-sm font-medium">Deployment Phase</p>
                                <p className="text-sm text-muted-foreground">{projectStructure.roadmap.deploymentPhase}</p>
                            </Card>
                        )}

                        {projectStructure.roadmap.commonChallenges && (
                            <Card className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
                                <p className="text-sm font-medium">Common Challenges</p>
                                <p className="text-sm text-muted-foreground">{projectStructure.roadmap.commonChallenges}</p>
                            </Card>
                        )}

                        {projectStructure.roadmap.futureEnhancements && (
                            <Card className="p-4 border-border/50 bg-background/80 backdrop-blur-sm">
                                <p className="text-sm font-medium">Future Enhancements</p>
                                <p className="text-sm text-muted-foreground">{projectStructure.roadmap.futureEnhancements}</p>
                            </Card>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
};
