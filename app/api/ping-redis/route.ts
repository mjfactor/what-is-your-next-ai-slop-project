import { NextRequest, NextResponse } from 'next/server';
import { connectRedis, disconnectRedis } from '@/lib/redis';

export async function GET(request: NextRequest) {
    try {
        // Get authorization header for basic security
        const authHeader = request.headers.get('authorization');
        const expectedAuth = `Bearer ${process.env.PING_SECRET || 'default-ping-secret'}`;

        if (authHeader !== expectedAuth) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Connect to Redis
        const client = await connectRedis();

        // Ping Redis
        const pingResult = await client.ping();
        console.log('Redis ping result:', pingResult);

        // Get some basic info
        const info = {
            ping: pingResult,
            timestamp: new Date().toISOString(),
            status: 'healthy'
        };

        // Disconnect
        await disconnectRedis();

        return NextResponse.json({
            success: true,
            redis: info,
            message: 'Redis ping successful'
        });

    } catch (error) {
        console.error('Redis ping error:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'Redis ping failed',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
