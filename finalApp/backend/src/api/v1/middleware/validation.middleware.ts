import { Request, Response, NextFunction } from 'express';

export const validateTransaction = (req: Request, res: Response, next: NextFunction): void => {
    const { mobileNumber, amount, primaryPin, extraPin } = req.body;
  
    if (!mobileNumber || !amount || !primaryPin || !extraPin) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }
  
    if (amount <= 0) {
      res.status(400).json({ message: 'Invalid amount' });
      return;
    }
  
    next();
  };