import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectArchitecture } from '@/types/project';

interface ProjectArchitectureProps {
    architecture: ProjectArchitecture;
}

export function ProjectArchitectureCard({ architecture }: ProjectArchitectureProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Architecture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-3">Architecture Pattern</h3>
                    <Badge variant="secondary" className="text-sm">
                        {architecture.pattern}
                    </Badge>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Reasoning</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        {architecture.reasoning}
                    </p>
                </div>

                {architecture.alternatives && architecture.alternatives.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Alternative Patterns</h3>
                        <div className="space-y-2">
                            {architecture.alternatives.map((alternative, index) => (
                                <div key={index} className="p-3 border rounded-lg">
                                    <p className="text-sm text-muted-foreground">{alternative}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
