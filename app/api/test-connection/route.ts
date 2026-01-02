import { NextResponse } from 'next/server';
import Redis from 'ioredis';

export async function GET() {
    const redisUrl = process.env.REDIS_URL;

    if (!redisUrl) {
        return NextResponse.json({
            status: 'error',
            message: 'REDIS_URL is not defined'
        }, { status: 500 });
    }

    try {
        // Force options for debugging
        const options = {
            tls: { rejectUnauthorized: false },
            maxRetriesPerRequest: null,
            retryStrategy: (times: number) => Math.min(times * 50, 2000)
        };

        console.log('--- DEBUG CONNECTION ---');
        console.log('REDIS_URL:', redisUrl.replace(/(:)[^:@]*@/, '$1***@'));
        console.log('Options:', options);
        console.log('------------------------');

        const redis = new Redis(redisUrl, options as any);

        // Test Write
        const testKey = 'connection_test_' + Date.now();
        await redis.set(testKey, 'ok', 'EX', 60);

        // Test Read
        const value = await redis.get(testKey);

        // Cleanup
        await redis.del(testKey);
        redis.quit();

        if (value === 'ok') {
            return NextResponse.json({
                status: 'success',
                message: 'Redis connection verified!',
                url_masked: redisUrl.replace(/(:)[^:@]*@/, '$1***@') // Hide password
            });
        } else {
            return NextResponse.json({
                status: 'error',
                message: 'Write succeeded but read failed'
            }, { status: 500 });
        }

    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: 'Connection failed',
            error: error.message
        }, { status: 500 });
    }
}
