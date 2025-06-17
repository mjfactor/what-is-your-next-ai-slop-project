import { z } from 'zod';

// Enhanced tech choice with detailed guidance and sustainability metrics
const TechChoiceSchema = z.object({
    name: z.string(),
    reasoning: z.string(),
    alternatives: z.string(), // Alternative options and why this was chosen over them
    difficulty: z.enum(['Beginner-friendly', 'Intermediate', 'Advanced']),
    keyBenefits: z.string(),
    communitySupport: z.string().optional(), // Information about community size, activity, and support
    costCategory: z.enum(['Free/Open-source', 'Freemium', 'Paid', 'Enterprise']).optional()
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

// Risk assessment structure
const RiskSchema = z.object({
    description: z.string(),
    severity: z.enum(['Low', 'Medium', 'High']),
    mitigation: z.string()
});

// Project context information
const ProjectContextSchema = z.object({
    teamSize: z.enum(['Solo developer', 'Small team (2-5)', 'Medium team (6-15)', 'Large team (15+)']),
    experienceLevel: z.enum(['Beginner', 'Intermediate', 'Advanced'])
});

export const ProjectStructureSchema = z.object({
    // Unique identifier for the generated project plan
    id: z.string(),

    // Basic project information
    projectName: z.string(),
    description: z.string(),
    category: z.string(), // Dynamic category to support any project type
    complexity: z.enum(['Simple', 'Moderate', 'Complex']),

    // Optional project context
    context: ProjectContextSchema.optional(),

    // Enhanced technology stack with detailed reasoning
    techStack: z.object({
        frontend: TechChoiceSchema,
        backend: TechChoiceSchema,
        database: TechChoiceSchema,
        deployment: TechChoiceSchema,
        ai: TechChoiceSchema // AI integration whether needed or not
    }),

    // Architecture overview with integration strategy
    architecture: z.object({
        pattern: z.string(),
        description: z.string(),
        integrationStrategy: z.string().optional()
    }),

    // Development phases (max 5 items)
    phases: z.array(PhaseSchema).max(5),

    // Technology learning path
    learningPath: z.object({
        prerequisites: z.string(),
        studyOrder: z.string()
    }),

    // Best practices and recommendations
    bestPractices: z.string(),
    security: z.string(),
    testing: z.string(),
    performance: z.string(),

    // Risk assessment
    risks: z.array(RiskSchema).max(3).optional(),

    // Learning resources
    resources: z.array(ResourceSchema).max(6),    // Simplified implementation roadmap
    roadmap: z.object({
        mustDo: z.array(z.string()).min(10).max(20), // Step-by-step essential tasks
        optional: z.array(z.string()).max(8)  // Optional enhancements and improvements
    })
});

