import { forwardRef, Logger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionsModule } from '../permissions/permissions.module';
import { HttpExceptionFilter } from '../shared/filters/http-exception.filter';
import { RolesCommand } from './commands/roles.command';
import { RolesServiceApp } from './apps/roles.service';
import { RoleDocument, RoleSchema } from './schemas/role.schema';
import { RolesService } from './services/roles.service';
import { ApiRolesGateway } from './controllers/api-roles.gateway';
import { rolesConstraintProvicers } from './validators/constraint-providers';
import { UtilRole } from './utils/index.util';
import { RolesController } from './controllers/roles.controller';
import { RolesAccountsServiceApp } from './apps/roles-account.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoleDocument.name, schema: RoleSchema },
    ]),
    forwardRef(() => PermissionsModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [RolesController, ApiRolesGateway],
  providers: [
    RolesServiceApp,
    RolesAccountsServiceApp,
    RolesService,
    UtilRole,
    RolesCommand,
    Logger,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    ...rolesConstraintProvicers,
  ],
  exports: [RolesService, RolesServiceApp, RolesCommand],
})
export class RolesModule {}
