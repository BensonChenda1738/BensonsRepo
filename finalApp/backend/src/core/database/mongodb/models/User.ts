import mongoose, { Document, Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { config } from '../../../../config/app.config';

export interface IUser extends Document {
  mobileNumber: string;
  primaryPin: string;
  extraPin: string;
  accountStatus: 'active' | 'locked' | 'suspended';
  failedAttempts: number;
  lastFailedAttempt?: Date;
  comparePin: (pin: string) => Promise<boolean>;
  compareExtraPin: (pin: string) => Promise<boolean>;
}

const userSchema = new Schema({
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  primaryPin: {
    type: String,
    required: true,
  },
  extraPin: {
    type: String,
    required: true,
  },
  accountStatus: {
    type: String,
    enum: ['active', 'locked', 'suspended'],
    default: 'active',
  },
  failedAttempts: {
    type: Number,
    default: 0,
  },
  lastFailedAttempt: {
    type: Date,
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function(next) {
  if (this.isModified('primaryPin')) {
    this.primaryPin = await bcrypt.hash(this.primaryPin, config.security.bcryptRounds);
  }
  if (this.isModified('extraPin')) {
    this.extraPin = await bcrypt.hash(this.extraPin, config.security.bcryptRounds);
  }
  next();
});

userSchema.methods.comparePin = async function(pin: string): Promise<boolean> {
  return bcrypt.compare(pin, this.primaryPin);
};

userSchema.methods.compareExtraPin = async function(pin: string): Promise<boolean> {
  return bcrypt.compare(pin, this.extraPin);
};

export const User = mongoose.model<IUser>('User', userSchema);
