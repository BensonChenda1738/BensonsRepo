import { ITransaction } from '../../core/database/mongodb/models/Transaction';
import { Redis } from 'ioredis';
import { config } from '../../config/app.config';

export class FraudDetectionService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(config.db.redisUrl);
  }

  async analyzeTransaction(transaction: ITransaction): Promise<number> {
    // Basic fraud detection logic
    const key = `fraud:${transaction.mobileNumber}`;
    const count = await this.redis.incr(key);
    await this.redis.expire(key, 3600); // 1 hour window

    return count > 5 ? 0.9 : 0.1;
  }
}