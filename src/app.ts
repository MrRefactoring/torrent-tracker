import 'reflect-metadata';
// eslint-disable-next-line sort-imports
import * as express from 'express';
import { config } from './config';
import { configure } from './configurators';

async function main() {
  const app = express();

  console.log('Configuring app...'); // todo use winston logger
  await configure(app);
  console.log('App configured'); // todo use winston logger

  app.listen(config.port, () => console.log(`Server is listening on port ${config.port}`));
}

void main();
