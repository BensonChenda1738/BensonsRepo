import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  app: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
    apiPrefix: '/api/v1'
  },
  db: {
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/secure-momo',
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379'
  },
  security: {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiresIn: '24h',
    bcryptRounds: 12,
    rateLimitWindow: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100
  },
  mobileMoneyApi: {
    mtn: {
      baseUrl: process.env.MTN_API_BASE_URL,
      apiKey: process.env.MTN_API_KEY,
      apiSecret: process.env.MTN_API_SECRET
    },
    airtel: {
      baseUrl: process.env.AIRTEL_API_BASE_URL,
      apiKey: process.env.AIRTEL_API_KEY,
      apiSecret: process.env.AIRTEL_API_SECRET
    }
  },
  sms: {
    provider: process.env.SMS_PROVIDER || 'twilio',
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    fromNumber: process.env.TWILIO_FROM_NUMBER
  }
};