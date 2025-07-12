import { createClient } from 'redis';

// Create Redis client instance
const client = createClient({
    url: process.env.REDIS_URL
});

// Add error handling
client.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

client.on('connect', () => {
    console.log('Connected to Redis successfully');
});

client.on('ready', () => {
    console.log('Redis client is ready');
});

client.on('end', () => {
    console.log('Redis connection ended');
});

// Export client type for TypeScript
export type RedisClientType = typeof client;

// Connect function
export const connectRedis = async () => {
    try {
        if (!client.isReady) {
            await client.connect();
        }
        return client;
    } catch (error) {
        console.error('Failed to connect to Redis:', error);
        throw error;
    }
};

// Disconnect function
export const disconnectRedis = async () => {
    try {
        if (client.isReady) {
            await client.quit();
        }
    } catch (error) {
        console.error('Error disconnecting from Redis:', error);
        throw error;
    }
};

// Get client instance
export const getRedisClient = () => client;

// Export the client as default
export default client;
