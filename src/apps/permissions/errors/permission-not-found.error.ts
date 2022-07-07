import { PermissionMessagesEnum } from '../emuns/permission.enum';

export class PermissionNotFoundError extends Error {
  constructor() {
    super(PermissionMessagesEnum.NOT_FOUND);
  }
}
