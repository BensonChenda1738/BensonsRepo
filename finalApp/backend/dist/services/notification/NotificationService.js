"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const twilio_1 = require("twilio");
const app_config_1 = require("../../config/app.config");
class NotificationService {
    constructor() {
        this.client = new twilio_1.Twilio(app_config_1.config.sms.accountSid, app_config_1.config.sms.authToken);
    }
    async sendTransactionNotification(data) {
        console.log('Notification sent:', data);
    }
    async sendSecurityAlert(data) {
        console.log('Security alert:', data);
    }
    formatMessage(data) {
        switch (data.type) {
            case 'withdrawal_success':
                return `Transaction successful: ${data.amount} withdrawn. Ref: ${data.reference}`;
            default:
                return 'Transaction notification';
        }
    }
}
exports.NotificationService = NotificationService;
