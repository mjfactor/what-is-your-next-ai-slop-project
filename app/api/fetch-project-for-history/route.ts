import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

// TypeScript interfaces
interface ProjectResponse {
    id: string;
    generated_content: any;
    project_idea: string | null;
    created_at: Date;
    updated_at: Date;
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

export async function GET(request: NextRequest) {
    try {
        // Get the current session
        const session = await auth.api.getSession({
            headers: request.headers,
        });

        // Check if user is authenticated
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Import the database connection
        const { NeonDialect } = await import('kysely-neon');
        const { Kysely } = await import('kysely');

        const dialect = new NeonDialect({
            connectionString: process.env.DATABASE_URL,
        });

        const db = new Kysely<DatabaseSchema>({ dialect });

        // Fetch all projects for the current user
        const projects = await db
            .selectFrom('generated_project_plan')
            .select([
                'id',
                'generated_content',
                'project_idea',
                'created_at',
                'updated_at'
            ])
            .where('user_id', '=', session.user.id)
            .orderBy('created_at', 'desc')
            .execute();

        return NextResponse.json({
            projects,
            count: projects.length
        });

    } catch (error) {
        console.error('Error fetching projects:', error);

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
