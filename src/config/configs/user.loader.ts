import { registerAs } from '@nestjs/config';
import { ConfigLoaderUser } from '../interfaces/config-loader.interface';
import { configLoader } from './env.configs';

export const userConfigLoader = registerAs(
  'user',
  (): ConfigLoaderUser => configLoader().modules.user,
);
