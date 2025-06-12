import { z } from 'zod';

export const ProjectStructureSchema = z.object({
    projectName: z.string(),
    description: z.string(),
    techStack: z.object({
        frontend: z.array(z.string()),
        backend: z.array(z.string()),
        database: z.array(z.string()),
        deployment: z.array(z.string()),
        additional: z.array(z.string())
    }),
    recommendations: z.object({
        bestPractices: z.array(z.string()),
        securityConsiderations: z.array(z.string()),
        scalabilityTips: z.array(z.string()),
        developmentWorkflow: z.array(z.string())
    }),
});

