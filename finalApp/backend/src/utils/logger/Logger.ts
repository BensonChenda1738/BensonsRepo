import winston from 'winston';

export class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
      ]
    });
  }

  error(message: string, meta?: any) {
    this.logger.error(message, meta);
  }
}