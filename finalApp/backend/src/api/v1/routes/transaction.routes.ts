import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateTransaction } from '../middleware/validation.middleware';
import { rateLimiter } from '../middleware/rateLimit.middleware';

const router = Router();
const transactionController = new TransactionController();

router.post(
  '/withdraw',
  authMiddleware,
  rateLimiter,
  validateTransaction,
  transactionController.processWithdrawal
);

router.get(
  '/history',
  authMiddleware,
  transactionController.getTransactionHistory
);

router.get(
  '/status/:reference',
  authMiddleware,
  transactionController.getTransactionStatus
);

export default router;