import { CustomMessage } from 'src/apps/shared/errors/custom.error';
import { PermissionMessagesEnum } from '../emuns/permission.enum';

export type PermissionMessagesType = {
  [key in PermissionMessagesEnum]: CustomMessage;
};
