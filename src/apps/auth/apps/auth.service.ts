import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { plainToClass, plainToInstance } from 'class-transformer';
import { RolesService } from 'src/apps/roles/services/roles.service';
import { AuthHelper } from 'src/apps/auth/utils/auth.helper';
import { convertObjectToJson, mergeArrays } from 'src/apps/shared/helpers';
import { getTokenExpires, matchOneItemArrays } from '../utils/auth.helper';
import { UsersService } from 'src/apps/users/services/users.service';
import { GetUserAuthDto } from 'src/apps/users/dto/get-user-auth.dto';
import { GetUserLoginDto } from 'src/apps/users/dto/get-user-login.dto';
import { SessionsApp } from './sessions.service';
import { generateToken } from 'src/apps/users/utils/index.util';
import { CreateSessionRegistrationDto } from '../dto/create-session-registration.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { RefreshTokenResponseDto } from '../dto/refresh-token-response.dto';
import { RefreshTokenInvalidError } from '../errors/refresh-token.error';
import { CreateTokenDto } from '../dto/create-token.dto';

@Injectable()
export class AuthApp {
  constructor(
    private readonly authHelper: AuthHelper,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private sessionsApp: SessionsApp,
  ) {}

  getAuthUserByUuid = async (uuid: string): Promise<GetUserAuthDto> => {
    const user = plainToClass(
      GetUserAuthDto,
      await this.usersService.getUserByUuid(uuid),
    );
    const listRoles = await this.rolesService.getRoleByKeys(user.roles);
    let permissions = user.permissions ?? [];
    listRoles.map((r) => {
      permissions = mergeArrays(permissions, r.permissions);
    });
    user.permissions = permissions;
    return user;
  };

  getUserLoginByData = async (
    userEmailPhone: string,
  ): Promise<GetUserLoginDto> => {
    const user = plainToClass(
      GetUserLoginDto,
      await this.usersService.getUserLogin(userEmailPhone),
    );
    if (!user) return null;
    const listRoles = await this.rolesService.getRoleByKeys(user.roles ?? []);
    let permissions = user.permissions ?? [];
    listRoles.map((r) => {
      permissions = mergeArrays(permissions, r.permissions);
    });
    user.permissions = permissions;
    return user;
  };

  async validateUser(
    userEmailPhone: string,
    pass: string,
  ): Promise<Partial<GetUserLoginDto>> {
    const user = await this.getUserLoginByData(userEmailPhone);
    if (!user || !(await bcrypt.compare(pass, user.password))) return null;
    const result = plainToInstance(GetUserLoginDto, user);
    return result;
  }

  async login(
    user: GetUserLoginDto,
    createSessionRegistrationDto: CreateSessionRegistrationDto,
  ) {
    const { uuid, enabled, email, phone } = user;
    user.time_of_live_token = getTokenExpires();
    createSessionRegistrationDto.user_uuid = uuid;
    const res = await this.sessionsApp.getSessionRegistrationByUuidDevice(
      createSessionRegistrationDto.uuid_device,
    );
    if (res) await this.sessionsApp.getSessionRegistrationById(res._id);
    const refreshToken = generateToken();
    user.key_refresh_token = refreshToken;
    const data: CreateTokenDto = {
      uuid,
      enabled,
      email,
      phone,
    };
    const token = this.authHelper.genereteToken(data);
    createSessionRegistrationDto.key_refresh_token = refreshToken;
    createSessionRegistrationDto.token = token;
    await this.sessionsApp.createSessionRegistration(
      createSessionRegistrationDto,
    );
    return plainToInstance(LoginResponseDto, {
      ...user,
      token,
    });
  }

  async logout(user: string) {
    const JsonUser = convertObjectToJson(user);
    const user_uuid = JsonUser.uuid;
    const uuid_device = JsonUser.device_uuid;
    const registration = await this.sessionsApp.getSessionRegistrationByUuids(
      user_uuid,
      uuid_device,
    );
    const Json = convertObjectToJson(registration);
    this.sessionsApp.getSessionRegistrationById(Json._id);
  }

  async refreshToken(
    createSessionRegistrationDto: CreateSessionRegistrationDto,
  ) {
    const rt = await this.sessionsApp.getSessionRegistrationByRefreshToken(
      createSessionRegistrationDto.key_refresh_token,
      createSessionRegistrationDto.uuid_device,
    );
    if (!rt) throw new RefreshTokenInvalidError();
    const JsonRT = convertObjectToJson(rt);
    this.sessionsApp.getSessionRegistrationById(JsonRT._id);
    const user = await this.usersService.getUserByUuid(JsonRT.user_uuid);
    const data: CreateTokenDto = {
      uuid: JsonRT.user_uuid,
      enabled: user.enabled,
      email: user.email,
      phone: user.phone,
    };
    const token = this.authHelper.genereteToken(data);
    const refreshToken = generateToken();
    const tokenExpiration = getTokenExpires();
    createSessionRegistrationDto.uuid_device = JsonRT.uuid_device;
    createSessionRegistrationDto.user_uuid = JsonRT.user_uuid;
    createSessionRegistrationDto.token = token;
    createSessionRegistrationDto.key_refresh_token = refreshToken;
    await this.sessionsApp.createSessionRegistration(
      createSessionRegistrationDto,
    );
    return plainToInstance(RefreshTokenResponseDto, {
      token,
      tokenExpiration,
      refreshToken,
      user_uuid: createSessionRegistrationDto.user_uuid,
    });
  }

  async access(user: GetUserAuthDto, body) {
    const data = {
      uuid: user.uuid,
      email: user.email,
      phone: user.phone,
      access: true,
    };
    if (!body.roles && !body.permissions) return { access: false };
    if (user.roles.includes('super_admin')) return data;
    if (
      matchOneItemArrays(user.roles, body.roles) ||
      matchOneItemArrays(user.permissions, body.permissions)
    )
      return data;
    return { access: false };
  }
}
