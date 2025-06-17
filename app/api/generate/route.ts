import { google } from '@ai-sdk/google';
import { streamObject } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { ProjectStructureSchema } from '@/lib/schema/let-ai-decide-schema';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { NeonDialect } from 'kysely-neon';
import { Kysely } from 'kysely';
import { generateId } from 'ai';

// Define database interface types
interface Database {
    generated_project_plan: GeneratedProjectPlanTable;
}

interface GeneratedProjectPlanTable {
    id: string;
    user_id: string;
    generated_content: any;
    project_idea: string;
    created_at: Date;
    updated_at: Date;
}

// Initialize Kysely instance with Neon dialect
const db = new Kysely<Database>({
    dialect: new NeonDialect({
        connectionString: process.env.DATABASE_URL as string,
    }),
});

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        // Get the current user session
        const session = await auth.api.getSession({
            headers: await headers()
        });

        // Generate UUID upfront so we can include it in the response
        const generatedId = generateId();

        const model = google('gemini-2.5-flash-preview-04-17', {
            useSearchGrounding: true,
        });

        const projectIdea = await req.json();
        console.log('Received project idea:', projectIdea);

        // Define database insertion function for reuse
        const saveToDatabase = async (userId: string, content: any, ideaText: string, id: string) => {
            try {
                const now = new Date();

                // Insert into database using the pre-generated ID
                await db
                    .insertInto('generated_project_plan')
                    .values({
                        id,
                        user_id: userId,
                        generated_content: content,
                        project_idea: ideaText,
                        created_at: now,
                        updated_at: now
                    })
                    .execute();

                console.log(`Project plan saved to database with ID: ${id}`);
                return id;
            } catch (dbError) {
                console.error('Database insertion error:', dbError);
                throw dbError;
            }
        }; const result = streamObject({
            model,
            prompt: `
You are a Senior Software Architect and Technology Advisor. Your primary goal is to help developers choose the RIGHT technology stack and provide a clear roadmap to build their project idea.

Analyze this project idea: "${projectIdea}"

IMPORTANT: You must structure your response to match the ProjectStructureSchema exactly. Include this exact ID in your response: "${generatedId}"

**REQUIRED RESPONSE STRUCTURE:**

**1. Basic Information:**
- id: "${generatedId}" (use this exact ID)
- projectName: A clear, descriptive project name
- description: Detailed project description
- category: Determine the most appropriate category (e.g., Web App, Mobile App, API, CLI Tool, Desktop App, Game, AI/ML, etc.)
- complexity: Must be exactly one of: "Simple", "Moderate", or "Complex"

**2. Project Context (REQUIRED):**
- teamSize: Must be exactly one of: "Solo developer", "Small team (2-5)", "Medium team (6-15)", "Large team (15+)"
- experienceLevel: Must be exactly one of: "Beginner", "Intermediate", "Advanced"

**3. Technology Stack (REQUIRED - Each technology must include ALL these fields):**
For EACH of the 5 required technologies (frontend, backend, database, deployment, ai), provide:
- name: Specific technology name (e.g., "React", "Node.js", "PostgreSQL")
- reasoning: Detailed explanation of WHY this technology is the best choice
- alternatives: Alternative options you considered and why you didn't choose them
- difficulty: Must be exactly one of: "Beginner-friendly", "Intermediate", "Advanced"
- keyBenefits: Key benefits this technology brings to the project
- communitySupport: Information about community size, activity, and support (optional)
- costCategory: Must be exactly one of: "Free/Open-source", "Freemium", "Paid", "Enterprise" (optional)

Required technologies to analyze:
- frontend: Frontend framework/technology
- backend: Backend technology
- database: Database solution
- deployment: Deployment platform
- ai: AI integration technology (critically evaluate whether AI is needed - if not needed, explain why simpler solutions are better)

For AI integration specifically:
- Use search grounding to find current information about AI frameworks like LangGraph, CrewAI, Google Agent Development Kit, LangChain, HuggingFace Transformers, Vercel AI SDK
- Only recommend AI if it truly adds value to the project
- Consider integration complexity, community support, and specific capabilities needed

**4. Architecture (REQUIRED):**
- pattern: Architecture pattern name (e.g., "MVC", "Microservices", "JAMstack")
- description: Detailed description of system design and components
- integrationStrategy: Integration strategy with existing systems or third-party services (optional)

**5. Development Phases (REQUIRED - Maximum 5 phases):**
Provide 3-5 development phases, each with:
- name: Phase name
- description: Description of deliverables and goals

**6. Learning Path (REQUIRED):**
- prerequisites: Prerequisites knowledge needed before starting
- studyOrder: Recommended study order for the technologies

**7. Best Practices & Strategy (REQUIRED - All fields must be provided):**
- bestPractices: Development best practices specific to chosen technologies
- security: Security considerations with recommended tools (e.g., Helmet, bcrypt, Auth0, OWASP guidelines)
- testing: Testing strategy with specific frameworks (e.g., Jest, Cypress, Playwright, Vitest)
- performance: Performance optimization strategies for frontend, backend, and infrastructure

**8. Risk Assessment (OPTIONAL - Maximum 3 risks):**
For each risk (2-3 maximum), provide:
- description: Description of the risk
- severity: Must be exactly one of: "Low", "Medium", "High"
- mitigation: Practical mitigation strategy

**9. Learning Resources (REQUIRED - Maximum 6 resources):**
Search for and provide up to 6 REAL, current URLs from official documentation sources only:
- title: Clear, descriptive name of the official documentation
- description: What the documentation covers and why it's essential
- url: Real, working URL to official documentation (optional but preferred)

**10. Implementation Roadmap (REQUIRED):**
- mustDo: Array of 10-20 step-by-step essential tasks (minimum 10, maximum 20)
- optional: Array of up to 8 optional enhancements and improvements

**CRITICAL REQUIREMENTS:**
- The response MUST validate against the ProjectStructureSchema
- All enum values must match exactly (case-sensitive)
- Array limits must be respected (phases max 5, risks max 3, resources max 6, optional max 8)
- mustDo array must have 10-20 items, optional array max 8 items
- All required fields must be present
- Use search grounding for current technology information, especially for AI frameworks`,
            schema: ProjectStructureSchema,
            onError({ error }) {
                console.error(error);
            },
            onFinish: async ({ object, error }) => {
                if (error) {
                    console.error("Schema validation error:", error);
                    return;
                } if (object && session?.user) {
                    try {
                        // Save the generated content to the database using the pre-generated ID
                        await saveToDatabase(
                            session.user.id,
                            object,
                            typeof projectIdea === 'string' ? projectIdea : JSON.stringify(projectIdea),
                            generatedId
                        );
                    } catch (dbErr) {
                        console.error("Failed to save to database:", dbErr);
                    }
                } else {
                    console.log("User not authenticated or no object generated, skipping database save");
                }
            }
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            {
                error: 'Failed to generate project structure',
                details: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString()
            },
            { status: 500 }
        );
    }
}