import rateLimit from 'express-rate-limit';
import { config } from '../../../config/app.config';

export const rateLimiter = rateLimit({
  windowMs: config.security.rateLimitWindow,
  max: config.security.maxRequests,
  message: { message: 'Too many requests, please try again later' }
});