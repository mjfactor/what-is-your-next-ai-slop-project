import { z } from 'zod';

// Enhanced tech choice with detailed guidance
const TechChoiceSchema = z.object({
    name: z.string(),
    reasoning: z.string(),
    alternatives: z.string(), // Alternative options and why this was chosen over them
    difficulty: z.enum(['Beginner-friendly', 'Intermediate', 'Advanced']),
    keyBenefits: z.string()
});

// Simple phase structure
const PhaseSchema = z.object({
    name: z.string(),
    description: z.string()
});

// Official documentation resource structure
const ResourceSchema = z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().optional() // Real URLs from official documentation
});

export const ProjectStructureSchema = z.object({    // Basic project information
    projectName: z.string(),
    description: z.string(),
    category: z.string(), // Dynamic category to support any project type
    complexity: z.enum(['Simple', 'Moderate', 'Complex']),

    // Enhanced technology stack with detailed reasoning
    techStack: z.object({
        frontend: TechChoiceSchema,
        backend: TechChoiceSchema,
        database: TechChoiceSchema,
        deployment: TechChoiceSchema
    }),

    // Architecture overview
    architecture: z.object({
        pattern: z.string(),
        description: z.string()
    }),

    // Development phases (max 5 items)
    phases: z.array(PhaseSchema).max(5),    // Technology learning path
    learningPath: z.object({
        prerequisites: z.string(),
        studyOrder: z.string()
    }),

    // Best practices and recommendations
    bestPractices: z.string(),
    security: z.string(),
    testing: z.string(),
    performance: z.string(),    // Learning resources
    resources: z.array(ResourceSchema).max(6),// Enhanced implementation roadmap
    roadmap: z.object({
        gettingStarted: z.string(),
        foundationPhase: z.string(),
        coreDevPhase: z.string(),
        integrationPhase: z.string(),
        testingPhase: z.string(),
        deploymentPhase: z.string(),
        commonChallenges: z.string(),
        futureEnhancements: z.string()
    })
});

