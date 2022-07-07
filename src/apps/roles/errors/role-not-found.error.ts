import { RoleMessagesEnum } from '../emuns/role-messages.enum';

export class RoleNotFoundError extends Error {
  constructor() {
    super(RoleMessagesEnum.NOT_FOUND);
  }
}
