import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { parseDocument } from 'src/apps/shared/utilis/helpers';
import { IRecoveryPassword } from '../interfaces/recovery-password.interface';
import { RecoveryPasswordTokenDocument } from '../schemas/recovery_password_token_document.schema';
import { RecoveryPasswordCodeDocument } from '../schemas/recovery_password_document.schema';
import {
  CreateRequestForRecoveryPasswordDto,
  GetTokenForRecoveryPasswordDto,
} from '../dto/recovery-password.dto';

@Injectable()
export class RecoveryPasswordService {
  constructor(
    @InjectModel(RecoveryPasswordCodeDocument.name)
    private readonly recoveryPasswordCodeDocumentModel: Model<RecoveryPasswordCodeDocument>,
    @InjectModel(RecoveryPasswordTokenDocument.name)
    private readonly recoveryPasswordTokenModel: Model<RecoveryPasswordTokenDocument>,
  ) {}

  createRecoveryPassword = (
    data: CreateRequestForRecoveryPasswordDto,
  ): Promise<any> => {
    return new this.recoveryPasswordCodeDocumentModel({
      ...data,
      created_at: new Date(),
    }).save();
  };

  createRecoveryPasswordToken = (
    data: GetTokenForRecoveryPasswordDto,
  ): Promise<any> => {
    return new this.recoveryPasswordTokenModel({
      ...data,
      created_at: new Date(),
    }).save();
  };

  getUserRecoveryPasswordByUserUuid = async (
    uuid: string,
  ): Promise<IRecoveryPassword> =>
    parseDocument(
      await this.recoveryPasswordCodeDocumentModel.findOne(
        { uuid },
        {},
        { sort: { created_at: 'DESC' } },
      ),
    );

  deleteCodeRecoveryPasswordByUserUuid = (user_uuid: string) =>
    this.recoveryPasswordCodeDocumentModel
      .findOneAndRemove({ user_uuid }, { new: true })
      .exec();

  deleteRecoveryPasswordTokenByUserUuid = (user_uuid: string) =>
    this.recoveryPasswordTokenModel
      .findOneAndRemove({ user_uuid }, { new: true })
      .exec();

  getUserConfirmationRecoveryPasswordByUuidAndCode = async (
    user_uuid: string,
    recovery_password_code: string,
  ): Promise<IRecoveryPassword> =>
    parseDocument(
      await this.recoveryPasswordCodeDocumentModel.findOne({
        recovery_password_code,
        user_uuid,
      }),
    );

  getUserConfirmationRecoveryPasswordByUserUuidAndToken = async (
    recovery_password_token: string,
    user_uuid: string,
  ): Promise<IRecoveryPassword> =>
    parseDocument(
      await this.recoveryPasswordTokenModel.findOne({
        recovery_password_token,
        user_uuid,
      }),
    );
}
