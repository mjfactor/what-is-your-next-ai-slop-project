import { google } from '@ai-sdk/google';
import { streamObject } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { ProjectStructureSchema } from '@/lib/schema/generate';
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
You are a Senior Software Architect and Technology Advisor. Your primary goal is to help developers choose the RIGHT technology stack by generating a comprehensive project plan.

Analyze this project idea: "${projectIdea}"

Your response MUST strictly adhere to the structure and requirements defined in the Zod schema. The schema's descriptions for each field serve as your instructions.

IMPORTANT: Include this exact ID in your response: "${generatedId}"
`,
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