import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DevelopmentPhase } from '@/types/project';

interface ProjectPhasesProps {
    phases: DevelopmentPhase[];
}

export function ProjectPhases({ phases }: ProjectPhasesProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Development Phases</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {phases.map((phase, index) => (
                        <div key={index} className="border rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold">{phase.phase}</h3>
                                <Badge variant="outline">{phase.duration}</Badge>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium mb-2">Features</h4>
                                    <ul className="space-y-1">
                                        {phase.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="text-sm text-muted-foreground flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-medium mb-2">Priorities</h4>
                                    <ul className="space-y-1">
                                        {phase.priorities.map((priority, priorityIndex) => (
                                            <li key={priorityIndex} className="text-sm text-muted-foreground flex items-start">
                                                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                                {priority}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
