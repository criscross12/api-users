import { forwardRef, Logger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionsModule } from '../permissions/permissions.module';
import { RolesModule } from '../roles/roles.module';
import { HttpExceptionFilter } from '../shared/filters/http-exception.filter';
import { UsersServiceApp } from './apps/users.service';
import { RecoveryPasswordServiceApp } from './apps/recovery_password.app';
import { UsersMeApp } from './apps/users-me.app';
import {
  RecoveryPasswordCodeDocument,
  RecoveryPasswordCodeDocumentSchema,
} from './schemas/recovery_password_document.schema';
import {
  AccountConfirmationDocument,
  AccountConfirmationSchema,
} from './schemas/code_confirmation.schema';
import { Factories } from './factories/factories';
import { UserDocument, UserSchema } from './schemas/user.schema';
import {
  RecoveryPasswordTokenDocument,
  RecoveryPasswordTokenDocumentSchema,
} from './schemas/recovery_password_token_document.schema';
import { UsersController } from './controllers/users.controller';
import { UsersMeController } from './controllers/users-me.controller';
import { ApiUsersGateway } from './controllers/api-users.gateway';
import { UsersService } from './services/users.service';
import { UtilUser } from './utils/index.util';
import { RecoveryPasswordService } from './services/recovery_password.service';
import { usersConstraintProvicers } from './validators/constraint-providers';
import { CustomConfigModule } from 'src/config/custom-config.module';
import { UsersCommand } from './commands/users.command';
import { UsersErrorsHandle } from './errors-handlers/users-errors.handler';
import { AuthModule } from '../auth/auth.module';
import { PasswordEncryptCommand } from './commands/password-encrypt.command';

@Module({
  imports: [
    CustomConfigModule,
    // NotificationsModule,
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
      {
        name: RecoveryPasswordCodeDocument.name,
        schema: RecoveryPasswordCodeDocumentSchema,
      },
      {
        name: RecoveryPasswordTokenDocument.name,
        schema: RecoveryPasswordTokenDocumentSchema,
      },
      {
        name: AccountConfirmationDocument.name,
        schema: AccountConfirmationSchema,
      },
    ]),
    PermissionsModule,
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController, UsersMeController, ApiUsersGateway],
  providers: [
    UsersServiceApp,
    UsersService,
    UsersCommand,
    Logger,
    RecoveryPasswordServiceApp,
    UtilUser,
    RecoveryPasswordService,
    UsersMeApp,
    UsersErrorsHandle,
    PasswordEncryptCommand,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    ...usersConstraintProvicers,
    ...Factories,
  ],
  exports: [UsersService, UsersServiceApp, UsersCommand, ...Factories],
})
export class UsersModule {}
