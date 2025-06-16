import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';


// TypeScript interfaces
interface RequestBody {
    id: string;
}

interface ProjectResponse {
    id: string;
    generated_content: any;
    project_idea: string | null;
    created_at: Date;
}

interface DatabaseSchema {
    generated_project_plan: {
        id: string;
        user_id: string;
        generated_content: any;
        project_idea: string | null;
        created_at: Date;
        updated_at: Date;
    };
}

export async function POST(request: NextRequest) {
    try {
        const body: RequestBody = await request.json();
        const { id } = body;

        // Validate that ID is provided
        if (!id) {
            return NextResponse.json(
                { error: 'Project ID is required' },
                { status: 400 }
            );
        }

        // Validate ID format (basic validation)
        if (typeof id !== 'string' || id.trim().length === 0) {
            return NextResponse.json(
                { error: 'Invalid project ID format' },
                { status: 400 }
            );
        }

        // Import the database connection - we'll use the same connection as in auth.ts
        const { NeonDialect } = await import('kysely-neon');
        const { Kysely } = await import('kysely');

        const dialect = new NeonDialect({
            connectionString: process.env.DATABASE_URL,
        });

        const db = new Kysely<DatabaseSchema>({ dialect });

        // Query the database for the project with the given ID
        const project = await db
            .selectFrom('generated_project_plan')
            .select(['id', 'generated_content', 'project_idea', 'created_at'])
            .where('id', '=', id.trim())
            .executeTakeFirst();

        if (!project) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            );
        }

        // Return the project data
        const response: ProjectResponse = {
            id: project.id,
            generated_content: project.generated_content,
            project_idea: project.project_idea,
            created_at: project.created_at,
        };

        return NextResponse.json(response);

    } catch (error) {
        console.error('Error fetching project:', error);

        // Check if it's a database connection error
        if (error instanceof Error && error.message.includes('connection')) {
            return NextResponse.json(
                { error: 'Database connection failed' },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
