import { Request, Response, NextFunction } from 'express';
import { logger } from '@logger';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
};
