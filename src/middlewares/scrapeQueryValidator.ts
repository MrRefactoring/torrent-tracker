import * as joi from 'joi';
import { BadRequestError } from '../errors';
import { NextFunction, Request, Response } from 'express';

export function scrapeQueryValidator(req: Request, res: Response, next: NextFunction) {
  const schema = joi
    .object()
    .keys({
      info_hash: joi.string().required(),
    });

  const { error } = schema
    .unknown()
    .prefs({ errors: { label: 'key' } })
    .validate(req.query);

  if (error) {
    return next(new BadRequestError(error.message));
  }

  next();
}
