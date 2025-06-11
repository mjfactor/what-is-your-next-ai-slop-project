import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Schema for the project structure optimized for React Flow
const ProjectStructureSchema = z.object({
    projectName: z.string(),
    description: z.string(),
    techStack: z.object({
        frontend: z.array(z.string()),
        backend: z.array(z.string()),
        database: z.array(z.string()),
        deployment: z.array(z.string()),
        additional: z.array(z.string())
    }),
    nodes: z.array(z.object({
        id: z.string(),
        type: z.string(),
        data: z.object({
            label: z.string(),
            description: z.string(),
            category: z.string(),
            technologies: z.array(z.string()),
            isCore: z.boolean()
        }),
        position: z.object({
            x: z.number(),
            y: z.number()
        })
    })),
    edges: z.array(z.object({
        id: z.string(),
        source: z.string(),
        target: z.string(),
        label: z.string().optional(),
        animated: z.boolean().optional()
    })),
    recommendations: z.object({
        bestPractices: z.array(z.string()),
        securityConsiderations: z.array(z.string()),
        scalabilityTips: z.array(z.string()),
        developmentWorkflow: z.array(z.string())
    }),
    estimatedTimeline: z.object({
        planning: z.string(),
        development: z.string(),
        testing: z.string(),
        deployment: z.string()
    })
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { projectIdea } = body;

        const result = await generateObject({
            model: google('gemini-2.5-flash-preview-04-17', {
                useSearchGrounding: true,
            }),
            prompt: `
        You are an expert software architect and project planner with decisive decision-making authority. The user has chosen "Let AI Decide" which means you must make definitive, single technology choices for their project.

        Project Idea: "${projectIdea}"

        **CRITICAL INSTRUCTIONS:**
        - DECIDE, don't suggest. Choose ONE specific technology for each category.
        - Make definitive choices based on the project requirements and current industry best practices.
        - Do NOT provide multiple options or alternatives - pick the single best solution.
        - Be opinionated and confident in your technology decisions.
        - Choose technologies that work well together and are production-ready.

        **Your Tasks:**
        1. **Project Analysis**: Analyze the requirements and DECIDE the optimal technology stack
        2. **Technology Decisions**: Choose the single best technology for each category
        3. **Architecture Design**: Create a visual representation with clear dependencies
        4. **Project Structure**: Organize components with the chosen technologies

        **Technology Decision Guidelines:**
        - Frontend: Choose ONE framework (e.g., "Next.js" not "Next.js, React, Vue")
        - Backend: Choose ONE primary technology (e.g., "Node.js" not "Node.js, Python, Go")
        - Database: Choose ONE database solution (e.g., "PostgreSQL" not "PostgreSQL, MongoDB")
        - Choose specific, named technologies, not categories

        **Node Categories to include:**
        - "frontend" (UI/UX components, frameworks)
        - "backend" (APIs, servers, business logic)
        - "database" (data storage, caching)
        - "auth" (authentication/authorization)
        - "deployment" (hosting, CI/CD)
        - "external" (third-party services, APIs)
        - "testing" (testing frameworks, tools)
        - "monitoring" (analytics, logging, error tracking)

        **Position Guidelines for React Flow:**
        - Frontend nodes: x: 100-300, y: 50-200
        - Backend nodes: x: 400-600, y: 50-200  
        - Database nodes: x: 700-900, y: 50-200
        - Auth nodes: x: 200-400, y: 250-350
        - External services: x: 500-700, y: 250-350
        - Deployment: x: 100-300, y: 400-500
        - Testing: x: 400-600, y: 400-500
        - Monitoring: x: 700-900, y: 400-500

        **Examples of Good Decisions:**
        - ✅ Frontend: ["Next.js", "TypeScript"] 
        - ✅ Backend: ["Node.js"]
        - ✅ Database: ["PostgreSQL"]
        - ❌ Frontend: ["React", "Vue", "Angular"] (too many options)
        - ❌ Backend: ["Various options available"] (not decisive)

        Make confident, practical decisions that result in a cohesive, modern tech stack.
      `,
            schema: ProjectStructureSchema,
        });


        // Access grounding metadata if needed
        const { groundingMetadata, safetyRatings } = result.providerMetadata?.google || {};

        // Console log the full response being sent
        const response = {
            success: true,
            projectStructure: result.object,
            metadata: {
                groundingMetadata,
                safetyRatings,
            }
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('🔥 API Route - Error occurred:', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            timestamp: new Date().toISOString()
        });

        return NextResponse.json(
            {
                error: 'Failed to generate project structure',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}