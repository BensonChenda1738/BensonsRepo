import mongoose, { Document } from 'mongoose';
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
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
