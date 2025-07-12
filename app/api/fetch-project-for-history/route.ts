import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectRedis } from '@/lib/redis';

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
        const redis = await connectRedis();
        const userId = session.user.id;
        const cacheKey = `user_projects:${userId}`;

        // Try to get data from Redis cache first
        let cachedData = null;

        if (redis) {
            try {
                cachedData = await redis.get(cacheKey);
                if (cachedData) {
                    console.log('Cache hit for user:', userId);
                    return NextResponse.json(JSON.parse(cachedData));
                }
            } catch (redisError) {
                console.error('Redis get error:', redisError);
                // Continue to database query if Redis fails
            }
        }

        // Cache miss or Redis unavailable - query database
        console.log('Cache miss for user:', userId);

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
            .where('user_id', '=', userId)
            .orderBy('created_at', 'desc')
            .execute();

        const result = {
            projects,
            count: projects.length
        };

        // Cache the result in Redis with 5-minute TTL
        if (redis) {
            try {
                await redis.setEx(cacheKey, 300, JSON.stringify(result));
                console.log('Data cached for user:', userId);
            } catch (redisError) {
                console.error('Redis set error:', redisError);
            }
        }

        return NextResponse.json(result);

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
