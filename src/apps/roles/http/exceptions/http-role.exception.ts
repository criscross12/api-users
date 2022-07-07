import { HttpException, Logger } from '@nestjs/common';
import { HttpError } from 'src/apps/shared/errors/interfaces/http-error.error';
import { ROLES_MESSAGES } from '../../messages/roles.message';

export class HttpExceptionRole {
  constructor(error: Error) {
    const e = this.getError(error);
    if (e) throw new HttpException(e, e.statusCode);
    Logger.error(error);
    throw new HttpException(
      {
        statusCode: 500,
        message: 'Error interno',
        error: 'roles.server.error',
      },
      500,
    );
  }

  getError = (error: Error): HttpError => ROLES_MESSAGES[error.message];
}
