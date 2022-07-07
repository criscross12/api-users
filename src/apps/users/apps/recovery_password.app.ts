import { Injectable } from '@nestjs/common';

import { CreateRequestForRecoveryPasswordFactory } from '../factories/create-request-for-recovery-password/create-request-for-recovery-password.factory';
import { ChangePasswordByRecoveryPasswordFactory } from '../factories/recovery-password/change-password-by-recovery-password.factory';
import { CreateTokenRecoveryPasswordFactory } from '../factories/create-token-recovery-password/create-token-recovery-password.factory';
import { MessageResponseDto } from 'src/apps/shared/dtos/message-response.dto';
import {
  ChangePasswordByRecoveryPasswordDto,
  CreateRequestForRecoveryPasswordDto,
  GetTokenForRecoveryPasswordDto,
} from '../dto/recovery-password.dto';
import { GetTokenForRecoveryPasswordTokenResponseDto } from '../dto/recovery-password-token-response.dto';

@Injectable()
export class RecoveryPasswordServiceApp {
  constructor(
    private readonly createRequestForRecoveryPasswordFactory: CreateRequestForRecoveryPasswordFactory,
    private readonly createTokenRecoveryPasswordFactory: CreateTokenRecoveryPasswordFactory,
    private readonly changePasswordByRecoveryPasswordFactory: ChangePasswordByRecoveryPasswordFactory,
  ) {}

  // createRequestForRecoveryPassword = async (
  //   createRequestForRecoveryPasswordDto: CreateRequestForRecoveryPasswordDto,
  // ): Promise<MessageResponseDto> =>
  //   this.createRequestForRecoveryPasswordFactory.recoveryPassword(
  //     createRequestForRecoveryPasswordDto,
  //   );

  createTokenForRecoveryPassword = async (
    getTokenForRecoveryPasswordDto: GetTokenForRecoveryPasswordDto,
  ): Promise<GetTokenForRecoveryPasswordTokenResponseDto> =>
    this.createTokenRecoveryPasswordFactory.createTokenRecoveryPassword(
      getTokenForRecoveryPasswordDto,
    );

  changePasswordByRecoveryPassword = async (
    changePasswordByRecoveryPasswordDto: ChangePasswordByRecoveryPasswordDto,
  ): Promise<MessageResponseDto> =>
    this.changePasswordByRecoveryPasswordFactory.changePasswordByRecoveryPassword(
      changePasswordByRecoveryPasswordDto,
    );
}
