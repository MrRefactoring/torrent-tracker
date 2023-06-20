import { Config } from '../interfaces';
import { loadEnvironmentVariables } from './loadEnvironmentVariables';

const environmentVariables = loadEnvironmentVariables();

export const config: Config = {
  ...environmentVariables,
  announceInterval: 300,
};
