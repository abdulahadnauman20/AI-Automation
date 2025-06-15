const { createClient } = require('redis');

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
        reconnectStrategy: (retries) => {
            if (retries > 10) {
                console.error('Redis connection failed after 10 retries');
                return new Error('Redis connection failed');
            }
            return Math.min(retries * 100, 3000);
        }
    }
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
    // Don't crash the application on Redis errors
});

redisClient.on('connect', () => {
    console.log('Redis client connected');
});

redisClient.on('reconnecting', () => {
    console.log('Redis client reconnecting...');
});

const connectRedis = async () => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
            console.log('Redis connected successfully');
        }
    } catch (error) {
        console.error('Redis connection error:', error);
        // Don't throw the error, allow the application to continue without Redis
    }
};

const setAccessToken = async (accessToken, expiresIn) => {
    try {
        await redisClient.set(`access_token`, accessToken, {
            EX: expiresIn
        });
    } catch (error) {
        console.error('Error setting access token:', error);
    }
};

const getAccessToken = async () => {
    try {
        return await redisClient.get(`access_token`);
    } catch (error) {
        console.error('Error getting access token:', error);
        return null;
    }
};

module.exports = {
    connectRedis,
    setAccessToken,
    getAccessToken
}; 