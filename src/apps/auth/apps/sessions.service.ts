import { Injectable } from '@nestjs/common';
import { SessionsService } from '../services/sessions.service';
import { CreateSessionRegistrationDto } from '../dto/create-session-registration.dto';

@Injectable()
export class SessionsApp {
  constructor(private readonly sessionsService: SessionsService) {}

  createSessionRegistration = async (
    createSessionRegistrationDto: CreateSessionRegistrationDto,
  ) => {
    return await this.sessionsService.createSessionRegistration(
      createSessionRegistrationDto,
    );
  };

  getSessionRegistrationByUuidDevice = async (uuid_device: string) => {
    return await this.sessionsService.getSessionByUuidDevice(uuid_device);
  };

  getSessionRegistrationByToken = async (token: string) => {
    return await this.sessionsService.getSessionBytoken(token);
  };

  getSessionRegistrationById = async (_id: string) => {
    return await this.sessionsService.getSessionById(_id);
  };

  getSessionRegistrationByUuids = async (
    user_uuid: string,
    uuid_device: string,
  ) => {
    return await this.sessionsService.getSessionByUuid(user_uuid, uuid_device);
  };

  getSessionRegistrationByRefreshToken = async (
    key_refresh_token: string,
    uuid_device: string,
  ) => {
    return await this.sessionsService.getSessionRegistrationByRefreshToken(
      key_refresh_token,
      uuid_device,
    );
  };
}
