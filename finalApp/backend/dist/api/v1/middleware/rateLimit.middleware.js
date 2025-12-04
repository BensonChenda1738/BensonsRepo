"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app_config_1 = require("../../../config/app.config");
exports.rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: app_config_1.config.security.rateLimitWindow,
    max: app_config_1.config.security.maxRequests,
    message: { message: 'Too many requests, please try again later' }
});
