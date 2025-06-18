import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectResources } from '@/types/project';
import { ExternalLink } from 'lucide-react';

interface ProjectResourcesProps {
    resources: ProjectResources;
}

function isRedditLink(url: string): boolean {
    return url.toLowerCase().includes('reddit.com') || url.toLowerCase().includes('r/');
}

function getRedditUrl(text: string): string {
    // If it's already a full URL, return it
    if (text.startsWith('http')) return text;

    // If it's a subreddit mention like "r/reactjs", convert to URL
    if (text.includes('r/')) {
        const subreddit = text.split('r/')[1].split(/[,\s]/)[0];
        return `https://www.reddit.com/r/${subreddit}`;
    }

    return text;
}

export function ProjectResourcesCard({ resources }: ProjectResourcesProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Learning Resources</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400">
                            Documentation
                        </h3>
                        <div className="space-y-3">
                            {resources.documentation.map((doc, index) => (
                                <div key={index} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <a
                                        href={doc.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-start gap-2 text-sm hover:text-primary transition-colors"
                                    >
                                        <div className="flex-1">
                                            <div className="font-medium group-hover:underline">{doc.name}</div>
                                            {doc.description && (
                                                <div className="text-muted-foreground mt-1">{doc.description}</div>
                                            )}
                                        </div>
                                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-0.5" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-green-600 dark:text-green-400">
                            Tutorials
                        </h3>
                        <div className="space-y-3">
                            {resources.tutorials.map((tutorial, index) => (
                                <div key={index} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <a
                                        href={tutorial.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-start gap-2 text-sm hover:text-primary transition-colors"
                                    >
                                        <div className="flex-1">
                                            <div className="font-medium group-hover:underline">{tutorial.name}</div>
                                            {tutorial.description && (
                                                <div className="text-muted-foreground mt-1">{tutorial.description}</div>
                                            )}
                                        </div>
                                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-0.5" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-purple-600 dark:text-purple-400">
                            Communities
                        </h3>
                        <div className="space-y-3">
                            {resources.communities.map((community, index) => {
                                const isReddit = isRedditLink(community.url);
                                const finalUrl = isReddit ? getRedditUrl(community.url) : community.url;

                                return (
                                    <div key={index} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                        <a
                                            href={finalUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-start gap-2 text-sm hover:text-primary transition-colors"
                                        >
                                            <div className="flex-1">
                                                <div className="font-medium group-hover:underline flex items-center gap-2">
                                                    {community.name}
                                                    {isReddit && (
                                                        <Badge variant="outline" className="text-xs">Reddit</Badge>
                                                    )}
                                                </div>
                                                {community.description && (
                                                    <div className="text-muted-foreground mt-1">{community.description}</div>
                                                )}
                                            </div>
                                            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-0.5" />
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
