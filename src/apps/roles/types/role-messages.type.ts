import { CustomMessage } from 'src/apps/shared/errors/custom.error';
import { RoleMessagesEnum } from '../emuns/role-messages.enum';

export type RoleMessagesType = {
  [key in RoleMessagesEnum]: CustomMessage;
};
