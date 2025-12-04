import mongoose, { Document } from 'mongoose';
export interface ITransaction extends Document {
    _id: mongoose.Types.ObjectId;
    mobileNumber: string;
    amount: number;
    agentId: mongoose.Types.ObjectId;
    status: 'pending' | 'completed' | 'failed';
    reference: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const Transaction: mongoose.Model<ITransaction, {}, {}, {}, mongoose.Document<unknown, {}, ITransaction> & ITransaction & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
