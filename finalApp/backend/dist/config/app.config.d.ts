export declare const config: {
    app: {
        port: string | number;
        env: string;
        apiPrefix: string;
    };
    db: {
        mongoUri: string;
        redisUrl: string;
    };
    security: {
        jwtSecret: string;
        jwtExpiresIn: string;
        bcryptRounds: number;
        rateLimitWindow: number;
        maxRequests: number;
    };
    mobileMoneyApi: {
        mtn: {
            baseUrl: string | undefined;
            apiKey: string | undefined;
            apiSecret: string | undefined;
        };
        airtel: {
            baseUrl: string | undefined;
            apiKey: string | undefined;
            apiSecret: string | undefined;
        };
    };
    sms: {
        provider: string;
        accountSid: string | undefined;
        authToken: string | undefined;
        fromNumber: string | undefined;
    };
};
