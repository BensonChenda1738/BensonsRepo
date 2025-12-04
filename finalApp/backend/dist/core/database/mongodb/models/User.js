"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt = __importStar(require("bcrypt"));
const app_config_1 = require("../../../../config/app.config");
const userSchema = new mongoose_1.Schema({
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
userSchema.pre('save', async function (next) {
    if (this.isModified('primaryPin')) {
        this.primaryPin = await bcrypt.hash(this.primaryPin, app_config_1.config.security.bcryptRounds);
    }
    if (this.isModified('extraPin')) {
        this.extraPin = await bcrypt.hash(this.extraPin, app_config_1.config.security.bcryptRounds);
    }
    next();
});
userSchema.methods.comparePin = async function (pin) {
    return bcrypt.compare(pin, this.primaryPin);
};
userSchema.methods.compareExtraPin = async function (pin) {
    return bcrypt.compare(pin, this.extraPin);
};
exports.User = mongoose_1.default.model('User', userSchema);
