import { HttpHandleException } from '../../../apps/shared/exceptions/http-handle.exception';
import { UserMessagesEnum } from '../enums/user-error-keys.enum';

export class HttpExceptionObjectInvalid extends HttpHandleException {
  constructor() {
    super(new Error(UserMessagesEnum.OBJECT_IS_INVALID));
  }
}
