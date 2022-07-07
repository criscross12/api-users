import { AuthMessagesEnum } from '../emuns/auth-error-keys.enum';

export class RefreshTokenInvalidError extends Error {
  constructor() {
    super(AuthMessagesEnum.REFRESH_TOKEN_INVALID);
  }
}
