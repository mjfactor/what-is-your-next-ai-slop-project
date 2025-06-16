'use client';

import { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CalendarDays, Eye, Loader2, FileText, Clock, Sparkles, Trash2, MoreHorizontal, Search } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';

interface Project {
    id: string;
    generated_content: any;
    project_idea: string | null;
    created_at: string;
    updated_at: string;
}

interface ApiResponse {
    projects: Project[];
    count: number;
}

export default function HistoryPage() {
    const { data: session, isPending } = useSession();
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); const [deletingId, setDeletingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
    useEffect(() => {
        if (!isPending && session?.user) {
            fetchProjects();
        } else if (!isPending && !session?.user) {
            setLoading(false);
            setError('Please sign in to view your project history');
        }
    }, [session, isPending]);

    useEffect(() => {
        // Filter projects based on search query
        if (!searchQuery.trim()) {
            setFilteredProjects(projects);
        } else {
            const filtered = projects.filter(project =>
                project.project_idea?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                getProjectPreview(project.generated_content).toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProjects(filtered);
        }
    }, [projects, searchQuery]);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/fetch-project-for-history');

            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }
            const data: ApiResponse = await response.json();
            setProjects(data.projects);
            setFilteredProjects(data.projects);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    }; const getProjectPreview = (content: any) => {
        if (!content) return 'No preview available';

        // Try to extract meaningful text from the generated content
        if (typeof content === 'string') {
            return content.slice(0, 120) + (content.length > 120 ? '...' : '');
        }

        if (typeof content === 'object') {
            // Look for common fields that might contain descriptive text
            const description = content.description || content.summary || content.overview;
            if (description) {
                return description.slice(0, 120) + (description.length > 120 ? '...' : '');
            }

            // Fallback to stringify if no obvious description field
            const stringified = JSON.stringify(content);
            return stringified.slice(0, 120) + (stringified.length > 120 ? '...' : '');
        }

        return 'Generated project plan available';
    }; const handleDeleteProject = async (projectId: string) => {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            setProjectToDelete(project);
            setDeleteDialogOpen(true);
        }
    };

    const confirmDelete = async () => {
        if (!projectToDelete) return;

        try {
            setDeletingId(projectToDelete.id);
            const response = await fetch(`/api/delete-project?id=${projectToDelete.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete project');
            }

            // Remove the project from the local state
            setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
            setFilteredProjects(prev => prev.filter(p => p.id !== projectToDelete.id));

            // Close dialog and reset state
            setDeleteDialogOpen(false);
            setProjectToDelete(null);
        } catch (err) {
            console.error('Error deleting project:', err);
            setError('Failed to delete project. Please try again.');
            // Auto-clear error after 5 seconds
            setTimeout(() => setError(null), 5000);
        } finally {
            setDeletingId(null);
        }
    };

    const cancelDelete = () => {
        setDeleteDialogOpen(false);
        setProjectToDelete(null);
    };

    if (isPending || loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="flex items-center space-x-2">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span className="text-lg">Loading your project history...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Alert className="max-w-md mx-auto">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    } return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Error Alert */}
            {error && (
                <Alert className="mb-6">
                    <AlertDescription className="flex items-center justify-between">
                        {error}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setError(null)}
                            className="ml-2 h-6 w-6 p-0"
                        >
                            ×
                        </Button>
                    </AlertDescription>
                </Alert>
            )}

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-6 w-6 text-primary" />
                    <h1 className="text-3xl font-bold">Project History</h1>
                </div>
                <p className="text-muted-foreground mb-4">
                    View and manage all your generated project plans
                </p>

                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                </div>

                <Separator className="mt-4" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">                <Card>
                <CardHeader className="pb-2">
                    <CardDescription>Total Projects</CardDescription>
                    <CardTitle className="text-2xl">{projects.length}</CardTitle>
                </CardHeader>
            </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>This Month</CardDescription>
                        <CardTitle className="text-2xl">
                            {projects.filter(p => {
                                const projectDate = new Date(p.created_at);
                                const now = new Date();
                                return projectDate.getMonth() === now.getMonth() &&
                                    projectDate.getFullYear() === now.getFullYear();
                            }).length}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>
                            {searchQuery ? 'Filtered Results' : 'Latest Activity'}
                        </CardDescription>
                        <CardTitle className="text-sm">
                            {searchQuery
                                ? `${filteredProjects.length} result${filteredProjects.length === 1 ? '' : 's'}`
                                : projects.length > 0 ? formatDate(projects[0].created_at) : 'No activity'
                            }
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>

            {/* Projects List */}
            {projects.length === 0 ? (
                <Card className="text-center py-12">
                    <CardContent>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="rounded-full bg-muted p-4">
                                <Sparkles className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
                                <p className="text-muted-foreground mb-4">
                                    Start creating your first AI-generated project plan!
                                </p>
                                <Button asChild>
                                    <Link href="/">Generate Project</Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">                    {projects.map((project) => (
                    <Card key={project.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <CardTitle className="flex items-center space-x-2 mb-2">
                                        <FileText className="h-5 w-5 text-primary" />
                                        <span>
                                            {project.project_idea || 'Untitled Project'}
                                        </span>
                                    </CardTitle>
                                    <CardDescription className="mb-3">
                                        {getProjectPreview(project.generated_content)}
                                    </CardDescription>
                                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                        <div className="flex items-center space-x-1">
                                            <CalendarDays className="h-4 w-4" />
                                            <span>{formatDate(project.created_at)}</span>
                                        </div>
                                        <Badge variant="secondary" className="text-xs">
                                            Generated
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 ml-4">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/${project.id}`}>
                                            <Eye className="h-4 w-4 mr-1" />
                                            View
                                        </Link>
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => handleDeleteProject(project.id)}
                                                className="text-destructive"
                                                disabled={deletingId === project.id}
                                            >
                                                {deletingId === project.id ? (
                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                ) : (
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                )}
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
                </div>
            )}            {/* Load More Button (for future pagination) */}
            {projects.length > 0 && (
                <div className="text-center mt-8">
                    <p className="text-muted-foreground">
                        Showing {projects.length} project{projects.length === 1 ? '' : 's'}
                    </p>
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Project</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "{projectToDelete?.project_idea || 'Untitled Project'}"?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={cancelDelete}
                            disabled={deletingId !== null}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={deletingId !== null}
                        >
                            {deletingId !== null && (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            )}
                            Delete Project
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
