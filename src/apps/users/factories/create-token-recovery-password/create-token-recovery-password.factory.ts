import { userConfigLoader } from 'src/config/configs/user.loader';
import {
  generateTokenToRecoveryPassword,
  getTimeInMinutesPassedOf,
} from '../../utils/index.util';
import { CreateTokenRecoveryPasswordByEmailFactory } from './create-token-recovery-password-by-email.factory';
import { Injectable } from '@nestjs/common';
import { RecoveryPasswordService } from '../../services/recovery_password.service';
import { GetTokenForRecoveryPasswordDto } from '../../dto/recovery-password.dto';
import { GetTokenForRecoveryPasswordTokenResponseDto } from '../../dto/recovery-password-token-response.dto';
import { RecoveryPasswordMethodsEnum } from '../../enums/recovery-password-method.enum';
import { IAbstractCreateTokenRecoveryPasswordFactory } from '../../interfaces/create-token-recovery-password-factory.interface';
import { UserMessagesEnum } from '../../enums/user-error-keys.enum';
import { UserNotFoundError } from '../../errors/user-not-found.error';

@Injectable()
export class CreateTokenRecoveryPasswordFactory {
  constructor(
    private recoveryPasswordService: RecoveryPasswordService,
    private readonly createTokenRecoveryPasswordByEmailFactory: CreateTokenRecoveryPasswordByEmailFactory,
  ) {}

  async createTokenRecoveryPassword(
    createTokenRecoveryPasswordDto: GetTokenForRecoveryPasswordDto,
  ): Promise<GetTokenForRecoveryPasswordTokenResponseDto> {
    switch (createTokenRecoveryPasswordDto.recovery_password_method) {
      case RecoveryPasswordMethodsEnum.EMAIL:
        return this.createTokenRecoveryPasswordByFactory(
          this.createTokenRecoveryPasswordByEmailFactory,
          createTokenRecoveryPasswordDto,
        );
      default:
        return this.createTokenRecoveryPasswordByFactory(
          this.createTokenRecoveryPasswordByEmailFactory,
          createTokenRecoveryPasswordDto,
        );
    }
  }

  private createTokenRecoveryPasswordByFactory = async (
    factory: IAbstractCreateTokenRecoveryPasswordFactory,
    payload: GetTokenForRecoveryPasswordDto,
  ): Promise<GetTokenForRecoveryPasswordTokenResponseDto> => {
    factory.setPayload(payload);

    const { recovery_password_code } = factory.payload;
    const { time_minutes_recovery_password } = userConfigLoader();
    const user = await factory.getUser();

    if (!user) throw new UserNotFoundError();

    const recoveryPassword =
      await this.recoveryPasswordService.getUserConfirmationRecoveryPasswordByUuidAndCode(
        user.uuid,
        recovery_password_code,
      );
    if (!recoveryPassword)
      throw new Error(UserMessagesEnum.RECOVERY_PASSWORD_CODE_INVALID);

    const minutes = getTimeInMinutesPassedOf(recoveryPassword.created_at);
    if (minutes > time_minutes_recovery_password)
      throw new Error(UserMessagesEnum.RECOVERY_PASSWORD_CODE_EXPIRED);

    await this.recoveryPasswordService.deleteRecoveryPasswordTokenByUserUuid(
      user.uuid,
    );

    const token = generateTokenToRecoveryPassword();
    await this.recoveryPasswordService.createRecoveryPasswordToken({
      ...factory.payload,
      user_uuid: user.uuid,
      recovery_password_token: token,
    });

    await this.recoveryPasswordService.deleteCodeRecoveryPasswordByUserUuid(
      user.uuid,
    );

    return {
      message: 'Token generado con exito',
      recovery_password_token: token,
    };
  };
}
