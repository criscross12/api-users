// import { ICreateNotificationForRecoveryPassword } from '@notifications/notifications-sdk';
import { GetUserDto } from '../dto/get-user.dto';
import { CreateRequestForRecoveryPasswordDto } from '../dto/recovery-password.dto';

export interface IAbstractCreateRequestForRecoveryPasswordFactory {
  payload: CreateRequestForRecoveryPasswordDto;

  getUser(): Promise<GetUserDto>;

  // getPayloadRequestRecoveryPassword(
  //   user: GetUserDto,
  //   recovery_password_code: string,
  // ): ICreateNotificationForRecoveryPassword;

  setPayload(payload: CreateRequestForRecoveryPasswordDto): void;
}
