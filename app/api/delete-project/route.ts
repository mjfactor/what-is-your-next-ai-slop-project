import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

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

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get('id');

        if (!projectId) {
            return NextResponse.json(
                { error: 'Project ID is required' },
                { status: 400 }
            );
        }

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

        const db = new Kysely<DatabaseSchema>({ dialect });        // Delete the project (only if it belongs to the current user)
        const result = await db
            .deleteFrom('generated_project_plan')
            .where('id', '=', projectId)
            .where('user_id', '=', session.user.id)
            .executeTakeFirst();

        if (Number(result.numDeletedRows) === 0) {
            return NextResponse.json(
                { error: 'Project not found or access denied' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error deleting project:', error);

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
