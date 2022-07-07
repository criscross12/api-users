import { UserMessagesEnum } from '../enums/user-error-keys.enum';

export class UserNotFoundError extends Error {
  constructor() {
    super(UserMessagesEnum.NOT_FOUND);
  }
}
