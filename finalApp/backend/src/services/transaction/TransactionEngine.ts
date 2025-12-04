import { EventEmitter } from 'events';
import { Transaction, ITransaction } from '../../core/database/mongodb/models/Transaction';
import { User } from '../../core/database/mongodb/models/User';
import { SecurityService } from '../security/SecurityService';
import { MobileMoneyService } from '../mobileMoneyProviders/MobileMoneyService';
import { NotificationService } from '../notification/NotificationService';
import { FraudDetectionService } from '../security/FraudDetection';
import { Logger } from '../../utils/logger/Logger';
import { TransactionError } from '../../utils/errors/TransactionError';

export class TransactionEngine extends EventEmitter {
  private security: SecurityService;
  private mobileMoneyService: MobileMoneyService;
  private notificationService: NotificationService;
  private fraudDetection: FraudDetectionService;
  private logger: Logger;

  constructor() {
    super();
    this.security = new SecurityService();
    this.mobileMoneyService = new MobileMoneyService();
    this.notificationService = new NotificationService();
    this.fraudDetection = new FraudDetectionService();
    this.logger = new Logger();
  }

  async processWithdrawal(
    transactionData: {
      mobileNumber: string;
      amount: number;
      agentId: string;
      primaryPin: string;
      extraPin: string;
    }
  ): Promise<ITransaction> {
    try {
      // Validate user and pins
      const user = await User.findOne({ mobileNumber: transactionData.mobileNumber });
      if (!user) {
        throw new TransactionError('User not found');
      }

      // Verify PINs
      const isPrimaryPinValid = await user.comparePin(transactionData.primaryPin);
      const isExtraPinValid = await user.compareExtraPin(transactionData.extraPin);

      if (!isPrimaryPinValid || !isExtraPinValid) {
        await this.handleFailedPinAttempt(user);
        throw new TransactionError('Invalid PIN');
      }

      // Create transaction record
      const transaction = await Transaction.create({
        mobileNumber: transactionData.mobileNumber,
        amount: transactionData.amount,
        agentId: transactionData.agentId,
        status: 'pending',
        reference: await this.generateTransactionReference()
      });

      // Fraud detection
      const fraudScore = await this.fraudDetection.analyzeTransaction(transaction);
      if (fraudScore > 0.7) {
        throw new TransactionError('Suspicious transaction detected');
      }

      // Process mobile money withdrawal
      const processingResult = await this.mobileMoneyService.processWithdrawal({
        transactionId: transaction._id.toString(),
        amount: transaction.amount,
        mobileNumber: transaction.mobileNumber,
        reference: transaction.reference
      });

      // Update transaction status
      transaction.status = 'completed';
      await transaction.save();

      // Send notification
      await this.notificationService.sendTransactionNotification({
        type: 'withdrawal_success',
        mobileNumber: transaction.mobileNumber,
        amount: transaction.amount,
        reference: transaction.reference
      });

      return transaction;
    } catch (error) {
      this.logger.error('Transaction processing failed', { error });
      throw error;
    }
  }

  private async handleFailedPinAttempt(user: any): Promise<void> {
    user.failedAttempts += 1;
    user.lastFailedAttempt = new Date();

    if (user.failedAttempts >= 3) {
      user.accountStatus = 'locked';
      await this.notificationService.sendSecurityAlert({
        type: 'account_locked',
        mobileNumber: user.mobileNumber
      });
    }

    await user.save();
  }

  private async generateTransactionReference(): Promise<string> {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `TXN-${timestamp}-${random}`.toUpperCase();
  }
}