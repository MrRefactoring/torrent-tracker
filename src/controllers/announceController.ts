import * as bencode from 'bencode';
import { AnnounceQuery } from '../interfaces';
import { Container } from 'typedi';
import { TrackerService } from '../services';
import { Request, Response } from 'express';

export async function announceController(req: Request, res: Response) {
  const query = req.query as unknown as AnnounceQuery;

  const trackerService = Container.get(TrackerService);

  const announceResponse = await trackerService.announce(query);

  console.log('resp', announceResponse);

  res.send(bencode.encode(announceResponse));
}
