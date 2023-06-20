import { ApiError } from './apiError';
import { ApiErrorCodes } from '../interfaces';

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, ApiErrorCodes.BadRequest);
  }
}
