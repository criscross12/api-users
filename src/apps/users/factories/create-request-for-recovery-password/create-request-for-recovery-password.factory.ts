import { Injectable } from '@nestjs/common';
// import { NotificationsService } from '@notifications/notifications-sdk';
import { MessageResponseDto } from 'src/apps/shared/dtos/message-response.dto';
import { userConfigLoader } from 'src/config/configs/user.loader';
import { CreateRequestForRecoveryPasswordDto } from '../../dto/recovery-password.dto';
import { RecoveryPasswordMethodsEnum } from '../../enums/recovery-password-method.enum';
import { UserMessagesEnum } from '../../enums/user-error-keys.enum';
import { UserNotFoundError } from '../../errors/user-not-found.error';
import { IAbstractCreateRequestForRecoveryPasswordFactory } from '../../interfaces/create-request-for-recovery-password-factory.interface';
import { RecoveryPasswordService } from '../../services/recovery_password.service';
import {
  generateRandomCode,
  getTimeInMinutesPassedOf,
} from '../../utils/index.util';
import { CreateRequestForRecoveryPasswordByEmailFactory } from './create-request-for-recovery-password-by-email.factory';

@Injectable()
export class CreateRequestForRecoveryPasswordFactory {
  constructor(
    private recoveryPasswordService: RecoveryPasswordService,
    // private notificationsService: NotificationsService,
    private readonly createRequestForRecoveryPasswordByEmailFactory: CreateRequestForRecoveryPasswordByEmailFactory,
  ) {}

  // public async recoveryPassword(
  //   createRequestForRecoveryPasswordDto: CreateRequestForRecoveryPasswordDto,
  // ): Promise<MessageResponseDto> {
  //   switch (createRequestForRecoveryPasswordDto.recovery_password_method) {
  //     case RecoveryPasswordMethodsEnum.EMAIL:
  //       return this.recoveryPasswordByFactory(
  //         this.createRequestForRecoveryPasswordByEmailFactory,
  //         createRequestForRecoveryPasswordDto,
  //       );
  //     case RecoveryPasswordMethodsEnum.PHONE:
  //       return this.recoveryPasswordByFactory(
  //         this.createRequestForRecoveryPasswordByPhoneFactory,
  //         createRequestForRecoveryPasswordDto,
  //       );
  //     default:
  //       return this.recoveryPasswordByFactory(
  //         this.createRequestForRecoveryPasswordByEmailFactory,
  //         createRequestForRecoveryPasswordDto,
  //       );
  //   }
  // }

  // private async recoveryPasswordByFactory(
  //   factory: IAbstractCreateRequestForRecoveryPasswordFactory,
  //   payload: CreateRequestForRecoveryPasswordDto,
  // ): Promise<MessageResponseDto> {
  //   factory.setPayload(payload);

  //   const user = await factory.getUser();
  //   const { time_minutes_recovery_password } = userConfigLoader();

  //   if (!user) throw new UserNotFoundError();

  //   const recoveryPassword =
  //     await this.recoveryPasswordService.getUserRecoveryPasswordByUserUuid(
  //       user.uuid,
  //     );

  //   if (recoveryPassword) {
  //     const minutes = getTimeInMinutesPassedOf(recoveryPassword.created_at);
  //     if (minutes < time_minutes_recovery_password) {
  //       throw new Error(UserMessagesEnum.RECOVERY_PASSWORD_CODE_INVALID);
  //     }
  //   }

  //   await this.recoveryPasswordService.deleteCodeRecoveryPasswordByUserUuid(
  //     user.uuid,
  //   );

  //   const recovery_password_code = generateRandomCode();
  //   const recoveryConfirmation = factory.getPayloadRequestRecoveryPassword(
  //     user,
  //     recovery_password_code,
  //   );
  //   await this.recoveryPasswordService.createRecoveryPassword({
  //     ...factory.payload,
  //     user_uuid: user.uuid,
  //     recovery_password_code,
  //   });

  //   await this.notificationsService.sendRecoveryPassword(recoveryConfirmation);
  //   return {
  //     message: 'Code sent successfully+',
  //   };
  // }
}
