import { ApiErrorCodes } from '../interfaces';

export class ApiError extends Error {
  constructor(
    public message: string,
    public errorCode: ApiErrorCodes = ApiErrorCodes.InternalServerError,
  ) {
    super(message);
  }
}
