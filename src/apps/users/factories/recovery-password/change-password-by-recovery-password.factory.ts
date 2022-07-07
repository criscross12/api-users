import { userConfigLoader } from 'src/config/configs/user.loader';
import { getTimeInMinutesPassedOf } from '../../utils/index.util';
import { ChangePasswordByRecoveryPasswordByEmailFactory } from './change-password-by-recovery-password-by-email.factory';
import { MessageResponseDto } from 'src/apps/shared/dtos/message-response.dto';
import { Injectable } from '@nestjs/common';
import { RecoveryPasswordService } from '../../services/recovery_password.service';
import { UsersService } from '../../services/users.service';
import { ChangePasswordByRecoveryPasswordDto } from '../../dto/recovery-password.dto';
import { RecoveryPasswordMethodsEnum } from '../../enums/recovery-password-method.enum';
import { IAbstractChangePasswordByRecoveryPasswordFactory } from '../../interfaces/change-password-by-recovery-password-factory.interface';
import { UserMessagesEnum } from '../../enums/user-error-keys.enum';
import { UserNotFoundError } from '../../errors/user-not-found.error';

@Injectable()
export class ChangePasswordByRecoveryPasswordFactory {
  constructor(
    private recoveryPasswordService: RecoveryPasswordService,
    private usersService: UsersService,
    private readonly changePasswordByRecoveryPasswordByEmailFactory: ChangePasswordByRecoveryPasswordByEmailFactory,
  ) {}

  async changePasswordByRecoveryPassword(
    changePasswordByRecoveryPasswordDto: ChangePasswordByRecoveryPasswordDto,
  ): Promise<MessageResponseDto> {
    switch (changePasswordByRecoveryPasswordDto.recovery_password_method) {
      case RecoveryPasswordMethodsEnum.EMAIL:
        return this.changePasswordByRecoveryPasswordByFactory(
          this.changePasswordByRecoveryPasswordByEmailFactory,
          changePasswordByRecoveryPasswordDto,
        );
      default:
        return this.changePasswordByRecoveryPasswordByFactory(
          this.changePasswordByRecoveryPasswordByEmailFactory,
          changePasswordByRecoveryPasswordDto,
        );
    }
  }

  private changePasswordByRecoveryPasswordByFactory = async (
    factory: IAbstractChangePasswordByRecoveryPasswordFactory,
    payload: ChangePasswordByRecoveryPasswordDto,
  ): Promise<MessageResponseDto> => {
    factory.setPayload(payload);
    const { recovery_password_token, password } = factory.payload;
    const { time_minutes_recovery_password } = userConfigLoader();
    const user = await factory.getUser();

    if (!user) throw new UserNotFoundError();

    const recoveryPassword =
      await this.recoveryPasswordService.getUserConfirmationRecoveryPasswordByUserUuidAndToken(
        recovery_password_token,
        user.uuid,
      );
    if (!recoveryPassword)
      throw new Error(UserMessagesEnum.RECOVERY_PASSWORD_TOKEN_INVALID);

    const minutes = getTimeInMinutesPassedOf(recoveryPassword.created_at);
    if (minutes > time_minutes_recovery_password)
      throw new Error(UserMessagesEnum.RECOVERY_PASSWORD_TOKEN_EXPIRED);

    await this.recoveryPasswordService.deleteRecoveryPasswordTokenByUserUuid(
      user.uuid,
    );

    await this.usersService.updatePasswordUserByUuid(user.uuid, password);

    return {
      message: 'Code to recovery password forwarded',
    };
  };
}
