import { forwardRef, Logger, Module } from '@nestjs/common';
import { AuthApp } from './apps/auth.service';
import { LocalStrategy } from './strategys/local.strategy';
import { JwtStrategy } from './strategys/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PermissionsModule } from '../permissions/permissions.module';
import { RolesModule } from '../roles/roles.module';
import { ApiAuthGateway } from './controllers/api-auth.gateway';
import { configLoader } from '../../config/configs/env.configs';
import { SessionsService } from './services/sessions.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SessionRegistrationDocument,
  SessionRegistrationSchema,
} from './schemas/session_registration.schema';
import { AuthController } from './controllers/auth.controller';
import { SessionsApp } from './apps/sessions.service';
import { AuthHelper } from './utils/auth.helper';
import { UtilRole } from '../roles/utils/index.util';
const { jwt_secret, jwt_expires_in } = configLoader().modules.auth;

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    forwardRef(() => RolesModule),
    forwardRef(() => PermissionsModule),
    MongooseModule.forFeature([
      {
        name: SessionRegistrationDocument.name,
        schema: SessionRegistrationSchema,
      },
    ]),
    JwtModule.register({
      secret: jwt_secret,
      signOptions: { expiresIn: jwt_expires_in },
    }),
  ],
  providers: [
    AuthApp,
    SessionsApp,
    AuthHelper,
    SessionsService,
    LocalStrategy,
    JwtStrategy,
    UtilRole,
    Logger,
  ],
  controllers: [AuthController, ApiAuthGateway],
  exports: [AuthApp, AuthHelper, SessionsApp, SessionsService],
})
export class AuthModule {}
