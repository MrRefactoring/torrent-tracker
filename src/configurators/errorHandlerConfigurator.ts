import { ApiError } from '../errors';
import { ApiErrorCodes } from '../interfaces';
import type { Express, NextFunction, Request, Response } from 'express';

function errorHandler(err: ApiError, req: Request, res: Response, next: NextFunction) {
  const statusCode = err?.errorCode || ApiErrorCodes.InternalServerError;

  res
    .status(statusCode)
    .json({ error: err.message || 'Unknown error' });

  next();
}

export function errorHandlerConfigurator(app: Express) {
  app.use(errorHandler);
}
