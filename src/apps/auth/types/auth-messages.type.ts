import { CustomMessage } from 'src/apps/shared/errors/custom.error';
import { AuthMessagesEnum } from '../emuns/auth-error-keys.enum';

export type AuthMessagesType = {
  [key in AuthMessagesEnum]: CustomMessage;
};
