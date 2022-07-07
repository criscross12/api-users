import { UserMessagesEnum } from '../enums/user-error-keys.enum';

export class TokenRecoveryPasswordExpiredError extends Error {
  constructor() {
    super(UserMessagesEnum.RECOVERY_PASSWORD_TOKEN_EXPIRED);
  }
}
