declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
import { Request, Response, NextFunction } from 'express';
export declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
