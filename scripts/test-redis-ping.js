#!/usr/bin/env node

/**
 * Test script to verify Redis ping endpoint
 * Run with: node scripts/test-redis-ping.js
 */

const http = require('http');
const https = require('https');
const url = require('url');

// Configuration
const PING_SECRET = process.env.PING_SECRET || 'redis-ping-secret-2024';
const BASE_URL = process.env.APP_URL || 'https://what-is-your-next-ai-slop-project.vercel.app';
const ENDPOINT = `${BASE_URL}/api/ping-redis`;

async function testRedisPing() {
    console.log('🔍 Testing Redis ping endpoint...');
    console.log(`📍 URL: ${ENDPOINT}`);

    const parsedUrl = url.parse(ENDPOINT);
    const lib = parsedUrl.protocol === 'https:' ? https : http;

    const options = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
        path: parsedUrl.path,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${PING_SECRET}`,
            'Content-Type': 'application/json'
        }
    };

    return new Promise((resolve, reject) => {
        const req = lib.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    console.log(`📊 Status Code: ${res.statusCode}`);
                    console.log('📄 Response:', JSON.stringify(response, null, 2));

                    if (res.statusCode === 200) {
                        console.log('✅ Redis ping successful!');
                        resolve(response);
                    } else {
                        console.log('❌ Redis ping failed');
                        reject(new Error(`HTTP ${res.statusCode}: ${response.error || 'Unknown error'}`));
                    }
                } catch (error) {
                    console.log('❌ Failed to parse response:', data);
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            console.log('❌ Request failed:', error.message);
            reject(error);
        });

        req.end();
    });
}

// Run the test
if (require.main === module) {
    testRedisPing()
        .then(() => {
            console.log('🎉 Test completed successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Test failed:', error.message);
            process.exit(1);
        });
}

module.exports = testRedisPing;
