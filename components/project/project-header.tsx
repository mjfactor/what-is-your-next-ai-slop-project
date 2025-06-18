import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectMetadata } from '@/types/project';

interface ProjectHeaderProps {
    projectName: string;
    projectDescription: string;
    metadata: ProjectMetadata;
    createdAt: Date;
}

const complexityColors = {
    Simple: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    Complex: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    Enterprise: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export function ProjectHeader({ projectName, projectDescription, metadata, createdAt }: ProjectHeaderProps) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <CardTitle className="text-3xl font-bold">{projectName}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Created on {new Date(createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <Badge
                            variant="secondary"
                            className={complexityColors[metadata.complexity]}
                        >
                            {metadata.complexity}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        {projectDescription}
                    </p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">{metadata.estimatedTimeline}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Team Size</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">{metadata.teamSize}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Budget</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm leading-relaxed">{metadata.budgetConsiderations}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
