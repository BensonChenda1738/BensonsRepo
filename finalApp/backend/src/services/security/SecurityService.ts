import { Redis } from 'ioredis';
import * as crypto from 'crypto';
import { config } from '../../config/app.config';

export class SecurityService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(config.db.redisUrl);
  }

  async generateToken(payload: any): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    await this.redis.setex(`token:${token}`, 300, JSON.stringify(payload));
    return token;
  }

  async verifyToken(token: string): Promise<boolean> {
    const exists = await this.redis.exists(`token:${token}`);
    return exists === 1;
  }
}