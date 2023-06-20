import * as mongoose from 'mongoose';
import { config } from '../config';

export async function dbConfigurator() {
  console.log('Connecting to MongoDB...'); // todo use winston logger
  await mongoose.connect(config.mongoUri);
  console.log('Connected to MongoDB'); // todo use winston logger
}
