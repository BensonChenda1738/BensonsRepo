declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../../../config/app.config';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }
    
    const decoded = jwt.verify(token, config.security.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};