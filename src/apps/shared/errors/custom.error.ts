import { ICustomMessage } from './interfaces/http-error.error';

export class CustomMessage {
  constructor(error: ICustomMessage) {
    error.statusCode = error.statusCode ?? 400;
    return error;
  }
}
