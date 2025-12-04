import mongoose, { Document, Schema } from 'mongoose';

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

const transactionSchema = new Schema({
  mobileNumber: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  agentId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Agent'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  reference: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

export const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);