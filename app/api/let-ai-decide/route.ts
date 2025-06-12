import { google } from '@ai-sdk/google';
import { streamObject } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { ProjectStructureSchema } from '@/lib/schema/let-ai-decide-schema';


export async function POST(req: NextRequest) {
    try {
        const model = google('gemini-2.5-flash-preview-04-17');
        const body = await req.json();
        const { projectIdea } = body;

        const result = streamObject({
            model,
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

        **Technology Decision Guidelines:**
        - Frontend: Choose ONE framework (e.g., "Next.js" not "Next.js, React, Vue")
        - Backend: Choose ONE primary technology (e.g., "Node.js" not "Node.js, Python, Go")
        - Database: Choose ONE database solution (e.g., "PostgreSQL" not "PostgreSQL, MongoDB")

        **Examples of Good Decisions:**
        - ✅ Frontend: ["Next.js"] with type: 'input', size: 'large', color: 'blue'
        - ✅ Backend: ["Node.js"] with type: 'default', size: 'large', color: 'green'  
        - ✅ Database: ["PostgreSQL"] with type: 'output', size: 'medium', color: 'orange'
        - ❌ Frontend: ["React", "Vue", "Angular"] (too many options)
        - ❌ Backend: ["Various options available"] (not decisive)
      `,
            schema: ProjectStructureSchema,
        });

        return result.toTextStreamResponse();
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