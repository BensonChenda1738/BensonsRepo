import { Request, Response } from 'express';
import { NotificationService } from '../../../services/notification/NotificationService';

export class NotificationController {
  private notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
  }

  async sendSMS(req: Request, res: Response) {
    try {
      const { mobileNumber, message } = req.body;

      if (!mobileNumber || !message) {
        return res.status(400).json({
          success: false,
          error: 'Mobile number and message are required',
        });
      }

      // Send SMS via NotificationService
      await this.notificationService.sendSMSDirectly(mobileNumber, message);

      res.json({
        success: true,
        message: 'SMS sent successfully',
        data: {
          mobileNumber,
          message,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error: any) {
      console.error('Error sending SMS:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to send SMS',
        message: error.message,
      });
    }
  }
}

