import { HttpException, Logger } from '@nestjs/common';
import { HttpError } from 'src/apps/shared/errors/interfaces/http-error.error';
import { PERMISSIONS_MESSAGES } from '../../messages/permissions.message';

export class HttpExceptionPermission {
  constructor(error: Error) {
    const e = this.getError(error);
    if (e) throw new HttpException(e, e.statusCode);
    Logger.error(error);
    throw new HttpException(
      {
        statusCode: 500,
        message: 'Error interno',
        error: 'permissions.server.error',
      },
      500,
    );
  }

  getError = (error: Error): HttpError => PERMISSIONS_MESSAGES[error.message];
}
