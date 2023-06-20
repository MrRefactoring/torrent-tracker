import { appConfigurator } from './appConfigurator';
import { dbConfigurator } from './dbConfigurator';
import { errorHandlerConfigurator } from './errorHandlerConfigurator';
import { Express } from 'express';

export async function configure(app: Express) {
  await dbConfigurator();
  appConfigurator(app);
  errorHandlerConfigurator(app);
}
