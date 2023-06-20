import * as compression from 'compression';
import { Express } from 'express';
import { router } from '../router';

export function appConfigurator(app: Express) {
  app.disable('x-powered-by');
  app.use(compression());
  app.use(router);
}
