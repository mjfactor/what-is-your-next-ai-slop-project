import { z } from 'zod';

// Technology choice with detailed information
const TechnologyChoiceSchema = z.object({
    name: z.string(),
    version: z.string().optional(),
    reasoning: z.string(),
    alternatives: z.array(z.string()),
    learningCurve: z.enum(['Easy', 'Moderate', 'Steep']),
    popularity: z.enum(['Low', 'Medium', 'High']),
    documentation: z.string().optional(),
    setupInstructions: z.array(z.string()),
    pros: z.array(z.string()),
    cons: z.array(z.string())
});

// Development phase with timeline and deliverables
const ProjectPhaseSchema = z.object({
    name: z.string(),
    description: z.string(),
    estimatedHours: z.number(),
    estimatedDays: z.number(),
    deliverables: z.array(z.string()),
    dependencies: z.array(z.string()),
    risks: z.array(z.string()),
    milestones: z.array(z.string())
});

// Learning resource with structured information
const ResourceSchema = z.object({
    title: z.string(),
    type: z.enum(['Documentation', 'Tutorial', 'Course', 'Book', 'Video', 'Article', 'Tool']),
    url: z.string().optional(),
    description: z.string(),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
    estimatedTime: z.string().optional(),
    isFree: z.boolean()
});

// File structure for project setup
const FileStructureSchema = z.object({
    path: z.string(),
    type: z.enum(['file', 'directory']),
    description: z.string(),
    content: z.string().optional(),
    importance: z.enum(['Essential', 'Recommended', 'Optional'])
});

// Security configuration
const SecurityConfigSchema = z.object({
    category: z.string(),
    requirements: z.array(z.string()),
    tools: z.array(z.string()),
    implementation: z.array(z.string()),
    priority: z.enum(['Critical', 'High', 'Medium', 'Low'])
});

// Testing strategy
const TestingStrategySchema = z.object({
    type: z.enum(['Unit', 'Integration', 'E2E', 'Performance', 'Security']),
    tools: z.array(z.string()),
    coverage: z.string(),
    strategy: z.string(),
    examples: z.array(z.string())
});

// Performance optimization
const PerformanceOptimizationSchema = z.object({
    category: z.string(),
    techniques: z.array(z.string()),
    tools: z.array(z.string()),
    metrics: z.array(z.string()),
    implementation: z.array(z.string())
});

// Deployment configuration
const DeploymentConfigSchema = z.object({
    platform: z.string(),
    type: z.enum(['Static', 'Server', 'Serverless', 'Container']),
    requirements: z.array(z.string()),
    steps: z.array(z.string()),
    environment: z.array(z.string()),
    monitoring: z.array(z.string())
});

export const ProjectStructureSchema = z.object({
    // Basic Project Information
    projectName: z.string(),
    description: z.string(),
    tagline: z.string(),
    category: z.enum(['Web App', 'Mobile App', 'Desktop App', 'API', 'CLI Tool', 'Library', 'Game', 'AI/ML', 'Blockchain', 'IoT']),

    // Project Characteristics
    projectMetadata: z.object({
        complexity: z.enum(['Simple', 'Moderate', 'Complex', 'Enterprise']),
        estimatedTimeline: z.object({
            development: z.string(),
            testing: z.string(),
            deployment: z.string(),
            total: z.string()
        }),
        teamSize: z.object({
            recommended: z.number(),
            minimum: z.number(),
            roles: z.array(z.string())
        }),
        budget: z.object({
            development: z.string(),
            infrastructure: z.string(),
            maintenance: z.string(),
            total: z.string()
        }),
        targetAudience: z.string(),
        businessValue: z.string(),
        successMetrics: z.array(z.string())
    }),

    // Enhanced Technology Stack
    techStack: z.object({
        frontend: TechnologyChoiceSchema,
        backend: TechnologyChoiceSchema,
        database: TechnologyChoiceSchema,
        authentication: TechnologyChoiceSchema.optional(),
        deployment: TechnologyChoiceSchema,
        testing: TechnologyChoiceSchema,
        monitoring: TechnologyChoiceSchema.optional(),
        cicd: TechnologyChoiceSchema.optional(),
        additional: z.array(TechnologyChoiceSchema)
    }),

    // Architecture and Design
    architecture: z.object({
        pattern: z.string(),
        description: z.string(),
        components: z.array(z.string()),
        dataFlow: z.string(),
        integrations: z.array(z.string()),
        scalabilityStrategy: z.string(),
        designPrinciples: z.array(z.string())
    }),

    // Development Phases
    developmentPhases: z.array(ProjectPhaseSchema),

    // File Structure and Setup
    projectStructure: z.object({
        rootFiles: z.array(FileStructureSchema),
        directories: z.array(FileStructureSchema),
        keyFiles: z.array(FileStructureSchema),
        setupCommands: z.array(z.string()),
        environmentVariables: z.array(z.object({
            name: z.string(),
            description: z.string(),
            example: z.string(),
            required: z.boolean()
        }))
    }),

    // Enhanced Recommendations
    recommendations: z.object({
        bestPractices: z.array(z.object({
            category: z.string(),
            practice: z.string(),
            reasoning: z.string(),
            implementation: z.string()
        })),
        codeQuality: z.array(z.string()),
        developmentWorkflow: z.array(z.string()),
        collaboration: z.array(z.string()),
        documentation: z.array(z.string())
    }),

    // Security Configuration
    security: z.array(SecurityConfigSchema),

    // Testing Strategy
    testing: z.array(TestingStrategySchema),

    // Performance Optimization
    performance: z.array(PerformanceOptimizationSchema),

    // Deployment Configuration
    deployment: z.array(DeploymentConfigSchema),

    // Learning Resources
    learningResources: z.object({
        essential: z.array(ResourceSchema),
        recommended: z.array(ResourceSchema),
        advanced: z.array(ResourceSchema),
        tools: z.array(ResourceSchema)
    }),

    // Implementation Roadmap
    roadmap: z.object({
        prerequisites: z.array(z.string()),
        quickStart: z.array(z.string()),
        milestones: z.array(z.object({
            name: z.string(),
            description: z.string(),
            timeframe: z.string(),
            deliverables: z.array(z.string())
        })),
        futureEnhancements: z.array(z.string())
    })
});

