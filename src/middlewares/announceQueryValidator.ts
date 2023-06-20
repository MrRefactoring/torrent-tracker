import * as joi from 'joi';
import { AnnounceQuery } from '../interfaces';
import { BadRequestError } from '../errors';
import { Container } from 'typedi';
import { DecoderService } from '../services';
import { NextFunction, Request, Response } from 'express';

export function announceQueryValidator(req: Request, res: Response, next: NextFunction) {
  const schema = joi
    .object()
    .keys({
      info_hash: joi.string().required(),
      peer_id: joi.string().required(),
      port: joi.number().required(),
      uploaded: joi.number().required(),
      downloaded: joi.number().required(),
      left: joi.number().required(),
      event: joi.string().valid('started', 'completed', 'stopped').required(),
      numwant: joi.number().required(),
      compact: joi.number(),
      key: joi.string(),
      supportcrypto: joi.number(),
    });

  const { error } = schema
    .unknown()
    .prefs({ errors: { label: 'key' } })
    .validate(req.query);

  if (error) {
    return next(new BadRequestError(error.message));
  }

  const query = req.query as unknown as AnnounceQuery;

  query.infoHash = Container.get(DecoderService).decode(req.query.info_hash as string);
  query.peerId = req.query.peer_id as string;

  query.ip = req.socket.remoteAddress!;

  query.port = parseInt(req.query.port as string);
  query.uploaded = parseInt(req.query.uploaded as string);
  query.downloaded = parseInt(req.query.downloaded as string);
  query.left = parseInt(req.query.left as string);
  query.numWant = parseInt(req.query.numwant as string);

  query.compact = Boolean(query.compact && parseInt(req.query.compact as string));
  query.supportCrypto = Boolean(req.query.supportcrypto && parseInt(req.query.supportcrypto as string));

  delete req.query.info_hash;
  delete req.query.peer_id;
  delete req.query.numwant;
  delete req.query.supportcrypto;

  next();
}
