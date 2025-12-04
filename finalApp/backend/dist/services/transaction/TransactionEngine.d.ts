import { EventEmitter } from 'events';
import { ITransaction } from '../../core/database/mongodb/models/Transaction';
export declare class TransactionEngine extends EventEmitter {
    private security;
    private mobileMoneyService;
    private notificationService;
    private fraudDetection;
    private logger;
    constructor();
    processWithdrawal(transactionData: {
        mobileNumber: string;
        amount: number;
        agentId: string;
        primaryPin: string;
        extraPin: string;
    }): Promise<ITransaction>;
    private handleFailedPinAttempt;
    private generateTransactionReference;
}
