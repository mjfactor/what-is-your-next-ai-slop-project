// TypeScript interfaces for project data structure

export interface ProjectMetadata {
    complexity: 'Simple' | 'Medium' | 'Complex' | 'Enterprise';
    estimatedTimeline: string;
    teamSize: string;
    budgetConsiderations: string;
}

export interface ProjectArchitecture {
    pattern: string;
    reasoning: string;
    alternatives?: string[];
}

export interface TechStackSection {
    frontend: {
        language: string;
        framework: string;
        libraries: string[];
        styling: string;
        buildTool: string;
    };
    backend: {
        language: string;
        framework: string;
        apiStyle: string;
        runtime?: string;
    };
    database: {
        type: string;
        provider: string;
        orm?: string;
        backupStrategy?: string;
    };
    developmentTools: {
        packageManager: string;
        linting: string;
        versionControl: string;
        ide: string;
    };
    testing: {
        unit: string;
        integration: string;
        e2e: string;
        coverage: string;
    };
    security: {
        authentication: string;
        authorization: string;
        dataProtection: string;
        vulnerabilityScanning?: string;
    };
    monitoring: {
        errorTracking: string;
        analytics: string;
        performance: string;
        logging: string;
    };
    thirdPartyServices: {
        payment?: string;
        email?: string;
        fileStorage?: string;
        search?: string;
    };
    deployment: {
        hosting: string;
        cicd: string;
        containerization?: string;
        cdn: string;
    };
    performance: {
        caching: {
            strategy: string;
            provider?: string;
        };
        optimization: string;
        monitoring: string;
    };
    aiIntegration?: {
        model?: string;
        library?: string;
        infrastructure?: string;
    };
}

export interface DevelopmentPhase {
    phase: string;
    duration: string;
    features: string[];
    priorities: string[];
}

export interface ProjectResources {
    documentation: ResourceLink[];
    tutorials: ResourceLink[];
    communities: ResourceLink[];
}

export interface ResourceLink {
    name: string;
    url: string;
    description?: string;
}

export interface ProjectData {
    id: string;
    projectName: string;
    projectDescription: string;
    metadata: ProjectMetadata;
    architecture: ProjectArchitecture;
    techStack: TechStackSection;
    developmentPhases: DevelopmentPhase[];
    reasoning: string;
    risks: string[];
    recommendations: string[];
    resources: ProjectResources;
}

export interface ApiResponse {
    id: string;
    generated_content: ProjectData;
    project_idea: string | null;
    created_at: Date;
}
