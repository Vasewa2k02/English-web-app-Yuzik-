import { registerAs } from '@nestjs/config';

import { AppEnvInterface } from './app-env.interface';

export default registerAs(
  'app',
  (): AppEnvInterface => ({
    HOST: process.env.APP_HOST,
    PORT: parseInt(process.env.APP_PORT, 10),
  }),
);
