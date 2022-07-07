import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { convertToJson } from 'src/apps/shared/helpers';
import { SessionRegistrationDocument } from 'src/apps/auth/schemas/session_registration.schema';
import { CreateSessionRegistrationDto } from '../dto/create-session-registration.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(SessionRegistrationDocument.name)
    private readonly sessionModel: Model<SessionRegistrationDocument>,
  ) {}

  createSessionRegistration = async (
    CreateSessionRegistrationDto: CreateSessionRegistrationDto,
  ) => {
    return convertToJson(
      await new this.sessionModel({
        ...CreateSessionRegistrationDto,
        started_at: new Date(),
      }).save(),
    );
  };

  getSessionBytoken = async (token: string) => {
    return convertToJson(
      await this.sessionModel.findOne({ token, end_at: null }),
    );
  };

  getSessionByUuidDevice = async (uuid_device: string) => {
    return convertToJson(
      await this.sessionModel.findOne({ uuid_device, end_at: null }),
    );
  };

  getSessionById = async (_id: string) => {
    return convertToJson(
      await this.sessionModel.findOneAndUpdate({ _id }, { end_at: new Date() }),
    );
  };

  getSessionByUuid = async (user_uuid: string, uuid_device: string) => {
    return convertToJson(
      await this.sessionModel.findOne({ user_uuid, uuid_device, end_at: null }),
    );
  };

  getSessionRegistrationByRefreshToken = async (
    key_refresh_token: string,
    uuid_device: string,
  ) => {
    return convertToJson(
      await this.sessionModel.findOne({
        key_refresh_token,
        uuid_device,
        end_at: null,
      }),
    );
  };
}
