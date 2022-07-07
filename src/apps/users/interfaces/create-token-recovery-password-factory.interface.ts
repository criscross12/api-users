// import { ICreateNotificationForRecoveryPassword } from '@notifications/notifications-sdk/interfaces/create-notification-for-recovery-password.interface';
import { GetUserDto } from '../dto/get-user.dto';
import { GetTokenForRecoveryPasswordDto } from '../dto/recovery-password.dto';

export interface IAbstractCreateTokenRecoveryPasswordFactory {
  payload: GetTokenForRecoveryPasswordDto;

  getUser(): Promise<GetUserDto>;

  // getPayloadRequestRecoveryPassword(
  //   user: GetUserDto,
  //   recovery_password_code: string,
  // ): ICreateNotificationForRecoveryPassword;

  setPayload(payload: GetTokenForRecoveryPasswordDto): void;
}
