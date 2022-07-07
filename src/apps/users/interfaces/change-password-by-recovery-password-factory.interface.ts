// import { ICreateNotificationForRecoveryPassword } from '@notifications/notifications-sdk';
import { GetUserDto } from '../dto/get-user.dto';
import { ChangePasswordByRecoveryPasswordDto } from '../dto/recovery-password.dto';

export interface IAbstractChangePasswordByRecoveryPasswordFactory {
  payload: ChangePasswordByRecoveryPasswordDto;

  getUser(): Promise<GetUserDto>;

  // getPayloadRequestRecoveryPassword(
  //   user: GetUserDto,
  //   recovery_password_code: string,
  // ): ICreateNotificationForRecoveryPassword;

  setPayload(payload: ChangePasswordByRecoveryPasswordDto): void;
}
