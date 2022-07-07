import { Logger, Module } from '@nestjs/common';
import { UsersModule } from './apps/users/users.module';
import { RolesModule } from './apps/roles/roles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionsModule } from './apps/permissions/permissions.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './apps/shared/filters/http-exception.filter';
import { SharedModule } from './apps/shared/shared.module';
import { AuthModule } from './apps/auth/auth.module';
import { DbConnectionService } from './config/services/db-connection.service';
import { CommandModule } from 'nestjs-command';
import { CustomConfigModule } from './config/custom-config.module';

@Module({
  imports: [
    CustomConfigModule,
    MongooseModule.forRoot(
      new DbConnectionService().getDBConection(),
      new DbConnectionService().optionsDB(),
    ),
    UsersModule,
    RolesModule,
    PermissionsModule,
    SharedModule,
    AuthModule,
    CommandModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    Logger,
  ],
})
export class AppModule {}
