import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface ProjectRisksAndRecommendationsProps {
    risks: string[];
    recommendations: string[];
    reasoning: string;
}

export function ProjectRisksAndRecommendations({
    risks,
    recommendations,
    reasoning
}: ProjectRisksAndRecommendationsProps) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Technical Reasoning</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{reasoning}</p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl text-red-600 dark:text-red-400">
                            Risks & Challenges
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {risks.map((risk, index) => (
                                <Alert key={index} className="border-red-200 dark:border-red-800">
                                    <AlertDescription className="text-sm">
                                        {risk}
                                    </AlertDescription>
                                </Alert>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl text-green-600 dark:text-green-400">
                            Recommendations
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recommendations.map((recommendation, index) => (
                                <Alert key={index} className="border-green-200 dark:border-green-800">
                                    <AlertDescription className="text-sm">
                                        {recommendation}
                                    </AlertDescription>
                                </Alert>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
