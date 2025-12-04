"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionEngine = void 0;
const events_1 = require("events");
const Transaction_1 = require("../../core/database/mongodb/models/Transaction");
const User_1 = require("../../core/database/mongodb/models/User");
const SecurityService_1 = require("../security/SecurityService");
const MobileMoneyService_1 = require("../mobileMoneyProviders/MobileMoneyService");
const NotificationService_1 = require("../notification/NotificationService");
const FraudDetection_1 = require("../security/FraudDetection");
const Logger_1 = require("../../utils/logger/Logger");
const TransactionError_1 = require("../../utils/errors/TransactionError");
class TransactionEngine extends events_1.EventEmitter {
    constructor() {
        super();
        this.security = new SecurityService_1.SecurityService();
        this.mobileMoneyService = new MobileMoneyService_1.MobileMoneyService();
        this.notificationService = new NotificationService_1.NotificationService();
        this.fraudDetection = new FraudDetection_1.FraudDetectionService();
        this.logger = new Logger_1.Logger();
    }
    async processWithdrawal(transactionData) {
        try {
            // Validate user and pins
            const user = await User_1.User.findOne({ mobileNumber: transactionData.mobileNumber });
            if (!user) {
                throw new TransactionError_1.TransactionError('User not found');
            }
            // Verify PINs
            const isPrimaryPinValid = await user.comparePin(transactionData.primaryPin);
            const isExtraPinValid = await user.compareExtraPin(transactionData.extraPin);
            if (!isPrimaryPinValid || !isExtraPinValid) {
                await this.handleFailedPinAttempt(user);
                throw new TransactionError_1.TransactionError('Invalid PIN');
            }
            // Create transaction record
            const transaction = await Transaction_1.Transaction.create({
                mobileNumber: transactionData.mobileNumber,
                amount: transactionData.amount,
                agentId: transactionData.agentId,
                status: 'pending',
                reference: await this.generateTransactionReference()
            });
            // Fraud detection
            const fraudScore = await this.fraudDetection.analyzeTransaction(transaction);
            if (fraudScore > 0.7) {
                throw new TransactionError_1.TransactionError('Suspicious transaction detected');
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
        }
        catch (error) {
            this.logger.error('Transaction processing failed', { error });
            throw error;
        }
    }
    async handleFailedPinAttempt(user) {
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
    async generateTransactionReference() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 5);
        return `TXN-${timestamp}-${random}`.toUpperCase();
    }
}
exports.TransactionEngine = TransactionEngine;
