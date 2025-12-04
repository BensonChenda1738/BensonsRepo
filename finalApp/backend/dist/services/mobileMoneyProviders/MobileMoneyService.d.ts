export declare class MobileMoneyService {
    processWithdrawal(data: {
        transactionId: string;
        amount: number;
        mobileNumber: string;
        reference: string;
    }): Promise<void>;
}
