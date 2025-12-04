import { Twilio } from 'twilio';
import { config } from '../../config/app.config';

export class NotificationService {
  private client: Twilio;

  constructor() {
    this.client = new Twilio(config.sms.accountSid!, config.sms.authToken!);
  }

  async sendTransactionNotification(data: {
    type: string;
    mobileNumber: string;
    amount?: number;
    reference?: string;
  }): Promise<void> {
    console.log('Notification sent:', data);
  }

  async sendSecurityAlert(data: { type: string; mobileNumber: string }): Promise<void> {
    console.log('Security alert:', data);
  }

  private formatMessage(data: any): string {
    switch (data.type) {
      case 'withdrawal_success':
        return `Transaction successful: ${data.amount} withdrawn. Ref: ${data.reference}`;
      default:
        return 'Transaction notification';
    }
  }
}