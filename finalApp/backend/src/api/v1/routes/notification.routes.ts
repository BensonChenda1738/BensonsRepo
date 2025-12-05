import { Router, Request, Response } from 'express';
import { NotificationController } from '../controllers/notification.controller';

const router = Router();
const notificationController = new NotificationController();

// Send SMS endpoint (no auth required for now, can add later)
router.post('/send-sms', (req: Request, res: Response) => {
  notificationController.sendSMS(req, res);
});

export default router;

