import { AuthMessagesType } from '../types/auth-messages.type';
import { CustomMessage } from '../../shared/errors/custom.error';
import { CustomConfigModule } from '../../../config/custom-config.module';
import { AuthMessagesEnum } from '../emuns/auth-error-keys.enum';

new CustomConfigModule();

export const AUTH_MESSAGES: AuthMessagesType = {
  [AuthMessagesEnum.REFRESH_TOKEN_INVALID]: new CustomMessage({
    message: 'El refresh token o el uuid device es invalido',
    error: AuthMessagesEnum.REFRESH_TOKEN_INVALID,
  }),
  [AuthMessagesEnum.DEVICE_UUID_INVALID]: new CustomMessage({
    message: 'uuid del dispositivo es invalido',
    error: AuthMessagesEnum.DEVICE_UUID_INVALID,
  }),
  [AuthMessagesEnum.DEVICE_TOKEN_INVALID]: new CustomMessage({
    message: 'token del dispositivo es invalido',
    error: AuthMessagesEnum.DEVICE_TOKEN_INVALID,
  }),
  [AuthMessagesEnum.DEVICE_NOT_FOUND]: new CustomMessage({
    message: 'no se encontro el dispositivo',
    error: AuthMessagesEnum.DEVICE_NOT_FOUND,
  }),
};
