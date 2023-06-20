import { Request, Response } from 'express';

export function scrapeController(req: Request, res: Response) {
  const { info_hash: infoHash } = req.query;

  console.log('hash', decodeURI(infoHash as string));

  res.send('scrape');
}
