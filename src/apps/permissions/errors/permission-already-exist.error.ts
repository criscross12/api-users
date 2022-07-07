import { PermissionMessagesEnum } from '../emuns/permission.enum';

export class PermissionAlreadyExistError extends Error {
  constructor() {
    super(PermissionMessagesEnum.ALREADY_EXIST);
  }
}
