import { Twilio } from 'twilio';
import { config } from '../../config/app.config';

export class NotificationService {
  private client: Twilio | null = null;
  private readonly BENSON_NUMBER = '0763913550';
  private readonly BENSON_NAME = 'Benson Chenda';

  constructor() {
    // Initialize Twilio client if credentials are available
    if (config.sms?.accountSid && config.sms?.authToken) {
      this.client = new Twilio(config.sms.accountSid, config.sms.authToken);
    }
  }

  async sendTransactionNotification(data: {
    type: string;
    mobileNumber: string;
    amount?: number;
    reference?: string;
  }): Promise<void> {
    try {
      // Check if this is the special number (0763913550)
      const normalizedNumber = this.normalizePhoneNumber(data.mobileNumber);
      const isBensonNumber = normalizedNumber === this.normalizePhoneNumber(this.BENSON_NUMBER);

      let message: string;

      if (isBensonNumber) {
        // Special message for Benson Chenda's number
        message = `Not yet connected to the MTN server. Contact: ${this.BENSON_NAME} at ${this.BENSON_NUMBER}`;
      } else {
        // Standard notification message
        message = this.formatMessage(data);
      }

      // Send SMS via Twilio if configured
      if (this.client && config.sms?.fromNumber) {
        try {
          await this.client.messages.create({
            body: message,
            to: `+260${normalizedNumber.replace(/^0/, '')}`, // Convert to international format
            from: config.sms.fromNumber,
          });
          console.log(`SMS sent successfully to ${data.mobileNumber}: ${message}`);
        } catch (twilioError: any) {
          console.error('Twilio SMS error:', twilioError.message);
          // Fallback to console log if Twilio fails
          console.log(`[SMS Notification] To: ${data.mobileNumber}, Message: ${message}`);
        }
      } else {
        // Log notification if Twilio is not configured
        console.log(`[SMS Notification] To: ${data.mobileNumber}, Message: ${message}`);
      }

    } catch (error: any) {
      console.error('Error sending notification:', error.message);
      throw error;
    }
  }

  async sendSecurityAlert(data: { type: string; mobileNumber: string }): Promise<void> {
    console.log('Security alert:', data);
  }

  /**
   * Send SMS directly to a mobile number via SMS gateway
   * This method is specifically for sending SMS to 0763913550 when withdrawal is blocked
   */
  async sendSMSDirectly(mobileNumber: string, message: string): Promise<void> {
    try {
      const normalizedNumber = this.normalizePhoneNumber(mobileNumber);
      const internationalNumber = `+260${normalizedNumber.replace(/^0/, '')}`;

      // Send SMS via Twilio if configured
      if (this.client && config.sms?.fromNumber) {
        try {
          const result = await this.client.messages.create({
            body: message,
            to: internationalNumber,
            from: config.sms.fromNumber,
          });
          console.log(`✅ SMS sent successfully via Twilio to ${mobileNumber}`);
          console.log(`   Message SID: ${result.sid}`);
          console.log(`   Message: ${message}`);
        } catch (twilioError: any) {
          console.error('❌ Twilio SMS error:', twilioError.message);
          // Still log the notification even if Twilio fails
          console.log(`📱 [SMS Notification - Fallback] To: ${mobileNumber}, Message: ${message}`);
          throw twilioError;
        }
      } else {
        // Log notification if Twilio is not configured
        console.log(`📱 [SMS Notification - No Gateway] To: ${mobileNumber}`);
        console.log(`   Message: ${message}`);
        console.log(`   Note: Twilio credentials not configured. SMS would be sent in production.`);
      }
    } catch (error: any) {
      console.error('Error in sendSMSDirectly:', error.message);
      throw error;
    }
  }

  private formatMessage(data: any): string {
    switch (data.type) {
      case 'withdrawal_success':
        return `Transaction successful: ${data.amount} withdrawn. Ref: ${data.reference}`;
      default:
        return 'Transaction notification';
    }
  }

  private normalizePhoneNumber(phoneNumber: string): string {
    // Remove all non-digit characters
    return phoneNumber.replace(/\D/g, '');
  }
}