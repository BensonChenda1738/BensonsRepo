import { ITransaction } from '../../core/database/mongodb/models/Transaction';
export declare class FraudDetectionService {
    private redis;
    constructor();
    analyzeTransaction(transaction: ITransaction): Promise<number>;
}
