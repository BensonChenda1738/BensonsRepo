"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTransaction = void 0;
const validateTransaction = (req, res, next) => {
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
exports.validateTransaction = validateTransaction;
