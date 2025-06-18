import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TechStackSection } from '@/types/project';

interface ProjectTechStackProps {
    techStack: TechStackSection;
}

export function ProjectTechStack({ techStack }: ProjectTechStackProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Technology Stack</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="multiple" className="w-full">
                    <AccordionItem value="frontend">
                        <AccordionTrigger className="text-lg font-semibold">Frontend</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-medium mb-2">Language</h4>
                                    <p className="text-sm text-muted-foreground">{techStack.frontend.language}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Framework</h4>
                                    <p className="text-sm text-muted-foreground">{techStack.frontend.framework}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Styling</h4>
                                    <p className="text-sm text-muted-foreground">{techStack.frontend.styling}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Build Tool</h4>
                                    <p className="text-sm text-muted-foreground">{techStack.frontend.buildTool}</p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">Libraries</h4>
                                <div className="flex flex-wrap gap-2">
                                    {techStack.frontend.libraries.map((lib, index) => (
                                        <Badge key={index} variant="outline">{lib}</Badge>
                                    ))}
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="backend">
                        <AccordionTrigger className="text-lg font-semibold">Backend</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-medium mb-2">Language</h4>
                                    <p className="text-sm text-muted-foreground">{techStack.backend.language}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Framework</h4>
                                    <p className="text-sm text-muted-foreground">{techStack.backend.framework}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">API Style</h4>
                                    <p className="text-sm text-muted-foreground">{techStack.backend.apiStyle}</p>
                                </div>
                                {techStack.backend.runtime && (
                                    <div>
                                        <h4 className="font-medium mb-2">Runtime</h4>
                                        <p className="text-sm text-muted-foreground">{techStack.backend.runtime}</p>
                                    </div>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="database">
                        <AccordionTrigger className="text-lg font-semibold">Database</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-medium mb-2">Type</h4>
                                    <p className="text-sm text-muted-foreground">{techStack.database.type}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Provider</h4>
                                    <p className="text-sm text-muted-foreground">{techStack.database.provider}</p>
                                </div>
                                {techStack.database.orm && (
                                    <div>
                                        <h4 className="font-medium mb-2">ORM</h4>
                                        <p className="text-sm text-muted-foreground">{techStack.database.orm}</p>
                                    </div>
                                )}
                                {techStack.database.backupStrategy && (
                                    <div>
                                        <h4 className="font-medium mb-2">Backup Strategy</h4>
                                        <p className="text-sm text-muted-foreground">{techStack.database.backupStrategy}</p>
                                    </div>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="testing">
                        <AccordionTrigger className="text-lg font-semibold">Testing</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-medium mb-2">Unit Testing</h4>
                                    <p className="text-sm text-muted-foreground">{techStack.testing.unit}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Integration Testing</h4>
                                    <p className="text-sm text-muted-foreground">{techStack.testing.integration}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">E2E Testing</h4>
                                    <p className="text-sm text-muted-foreground">{techStack.testing.e2e}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Coverage</h4>
                                    <p className="text-sm text-muted-foreground">{techStack.testing.coverage}</p>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="security">
                        <AccordionTrigger className="text-lg font-semibold">Security</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-medium mb-2">Authentication</h4>
                                    <p className="text-sm text-muted-foreground">{techStack.security.authentication}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Authorization</h4>
                                    <p className="text-sm text-muted-foreground">{techStack.security.authorization}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <h4 className="font-medium mb-2">Data Protection</h4>
                                    <p className="text-sm text-muted-foreground">{techStack.security.dataProtection}</p>
                                </div>
                                {techStack.security.vulnerabilityScanning && (
                                    <div className="md:col-span-2">
                                        <h4 className="font-medium mb-2">Vulnerability Scanning</h4>
                                        <p className="text-sm text-muted-foreground">{techStack.security.vulnerabilityScanning}</p>
                                    </div>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="deployment">
                        <AccordionTrigger className="text-lg font-semibold">Deployment</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-medium mb-2">Hosting</h4>
                                    <p className="text-sm text-muted-foreground">{techStack.deployment.hosting}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">CI/CD</h4>
                                    <p className="text-sm text-muted-foreground">{techStack.deployment.cicd}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">CDN</h4>
                                    <p className="text-sm text-muted-foreground">{techStack.deployment.cdn}</p>
                                </div>
                                {techStack.deployment.containerization && (
                                    <div>
                                        <h4 className="font-medium mb-2">Containerization</h4>
                                        <p className="text-sm text-muted-foreground">{techStack.deployment.containerization}</p>
                                    </div>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {techStack.aiIntegration && (
                        <AccordionItem value="ai">
                            <AccordionTrigger className="text-lg font-semibold">AI Integration</AccordionTrigger>
                            <AccordionContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {techStack.aiIntegration.model && (
                                        <div>
                                            <h4 className="font-medium mb-2">Model</h4>
                                            <p className="text-sm text-muted-foreground">{techStack.aiIntegration.model}</p>
                                        </div>
                                    )}
                                    {techStack.aiIntegration.library && (
                                        <div>
                                            <h4 className="font-medium mb-2">Library</h4>
                                            <p className="text-sm text-muted-foreground">{techStack.aiIntegration.library}</p>
                                        </div>
                                    )}
                                    {techStack.aiIntegration.infrastructure && (
                                        <div className="md:col-span-2">
                                            <h4 className="font-medium mb-2">Infrastructure</h4>
                                            <p className="text-sm text-muted-foreground">{techStack.aiIntegration.infrastructure}</p>
                                        </div>
                                    )}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    )}
                </Accordion>
            </CardContent>
        </Card>
    );
}
