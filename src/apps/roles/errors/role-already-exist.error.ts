import { RoleMessagesEnum } from '../emuns/role-messages.enum';

export class RoleAlreadyExistError extends Error {
  constructor() {
    super(RoleMessagesEnum.ALREADY_EXIST);
  }
}
