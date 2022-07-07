import { forwardRef, Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PermissionSchema,
  PermissionDocument,
} from './schemas/permission.schema';
import { PermissionsService } from './services/permissions.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../shared/filters/http-exception.filter';
import { UtilPermission } from './utils/index.util';
import { ApiPermissionsGateway } from './controllers/api-permissions.gateway';
import { PermissionsCommand } from './commands/permissions.command';
import { PermissionsController } from './controllers/permissions.controller';
import { permissionsConstraintProvicers } from './validators/constraint-providers';
import { PermissionsServiceApp } from './apps/permissions.service';
import { AuthModule } from '../auth/auth.module';
import { PermissionsAccountServiceApp } from './apps/permissions-accounts.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      { name: PermissionDocument.name, schema: PermissionSchema },
    ]),
  ],
  controllers: [PermissionsController, ApiPermissionsGateway],
  providers: [
    PermissionsService,
    PermissionsAccountServiceApp,
    PermissionsServiceApp,
    UtilPermission,
    PermissionsCommand,
    Logger,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    ...permissionsConstraintProvicers,
  ],
  exports: [PermissionsService, PermissionsServiceApp, PermissionsCommand],
})
export class PermissionsModule {}
