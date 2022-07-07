import { Injectable } from '@nestjs/common';
// import { NotificationMethodEnum } from '@notifications/notifications-sdk/enums/index.enum';
// import { ICreateNotificationForRecoveryPassword } from '@notifications/notifications-sdk/interfaces/create-notification-for-recovery-password.interface';
// import { buildJsonCreateNotificationRecoveryPassword } from '../../builders/user-notification.build';
import { GetUserDto } from '../../dto/get-user.dto';
import { GetTokenForRecoveryPasswordDto } from '../../dto/recovery-password.dto';
import { IAbstractCreateTokenRecoveryPasswordFactory } from '../../interfaces/create-token-recovery-password-factory.interface';
import { UsersService } from '../../services/users.service';

@Injectable()
export class CreateTokenRecoveryPasswordByEmailFactory
  implements IAbstractCreateTokenRecoveryPasswordFactory
{
  payload: GetTokenForRecoveryPasswordDto;

  constructor(private readonly usersService: UsersService) {}

  setPayload(payload: GetTokenForRecoveryPasswordDto): void {
    this.payload = payload;
  }

  // getPayloadRequestRecoveryPassword(
  //   user: GetUserDto,
  //   recovery_password_code: string,
  // ): ICreateNotificationForRecoveryPassword {
  //   return buildJsonCreateNotificationRecoveryPassword(
  //     user,
  //     recovery_password_code,
  //     NotificationMethodEnum.EMAIL,
  //   );
  // }

  async getUser(): Promise<GetUserDto> {
    const { email } = this.payload;
    return await this.usersService.getUserByEmail(email);
  }
}
