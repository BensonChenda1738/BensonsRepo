import { Request, Response } from 'express';
export declare class TransactionController {
    processWithdrawal(req: Request, res: Response): Promise<void>;
    getTransactionHistory(req: Request, res: Response): Promise<void>;
    getTransactionStatus(req: Request, res: Response): Promise<void>;
}
