import { CustomMessage } from 'src/apps/shared/errors/custom.error';
import { UserMessagesEnum } from '../enums/user-error-keys.enum';

export type UserMessagesType = {
  [key in UserMessagesEnum]: CustomMessage;
};
