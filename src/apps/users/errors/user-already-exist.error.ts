import { UserMessagesEnum } from '../enums/user-error-keys.enum';

export class UserAlreadyExistError extends Error {
  constructor() {
    super(UserMessagesEnum.ALREADY_EXIST);
  }
}
