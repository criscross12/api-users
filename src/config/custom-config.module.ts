import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configLoader } from './configs/env.configs';
import { EnvSchema } from './schemas/env.schema';
import { DbConnectionService } from './services/db-connection.service';
import { EnvService } from './services/env.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configLoader],
      validationSchema: EnvSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
  ],
  providers: [DbConnectionService, EnvService],
  exports: [DbConnectionService, EnvService],
})
export class CustomConfigModule {}
