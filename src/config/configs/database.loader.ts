import { registerAs } from '@nestjs/config';
import { ConfigLoader } from '../interfaces/config-loader.interface';
import { configLoader } from './env.configs';

export const appConfigLoader = registerAs(
  'app',
  (): ConfigLoader => configLoader(),
);
