"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FraudDetectionService = void 0;
const ioredis_1 = require("ioredis");
const app_config_1 = require("../../config/app.config");
class FraudDetectionService {
    constructor() {
        this.redis = new ioredis_1.Redis(app_config_1.config.db.redisUrl);
    }
    async analyzeTransaction(transaction) {
        // Basic fraud detection logic
        const key = `fraud:${transaction.mobileNumber}`;
        const count = await this.redis.incr(key);
        await this.redis.expire(key, 3600); // 1 hour window
        return count > 5 ? 0.9 : 0.1;
    }
}
exports.FraudDetectionService = FraudDetectionService;
