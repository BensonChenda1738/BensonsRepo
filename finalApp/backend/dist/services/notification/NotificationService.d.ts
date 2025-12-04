export declare class NotificationService {
    private client;
    constructor();
    sendTransactionNotification(data: {
        type: string;
        mobileNumber: string;
        amount?: number;
        reference?: string;
    }): Promise<void>;
    sendSecurityAlert(data: {
        type: string;
        mobileNumber: string;
    }): Promise<void>;
    private formatMessage;
}
