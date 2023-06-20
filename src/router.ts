import { Router } from 'express';
import { announceController, scrapeController } from './controllers';
import { announceQueryValidator, scrapeQueryValidator } from './middlewares';

export const router = Router()
  .get('/announce', announceQueryValidator, announceController)
  .get('/scrape', scrapeQueryValidator, scrapeController);
