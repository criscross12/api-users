import { HttpException, Logger } from '@nestjs/common';
import { HttpError } from 'src/apps/shared/errors/interfaces/http-error.error';
import { USER_MESSAGES } from '../messages/users.message';

export class HttpExceptionUser {
  constructor(error: Error) {
    const e = this.getError(error);
    if (e) throw new HttpException(e, e.statusCode);
    Logger.error(error);
    throw new HttpException(
      {
        statusCode: 500,
        message: 'Error interno',
        error: 'users.server.error',
      },
      500,
    );
  }

  getError = (error: Error): HttpError => USER_MESSAGES[error.message];
}
