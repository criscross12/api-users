import { PipeTransform, Injectable } from '@nestjs/common';
import { HttpExceptionObjectInvalid } from '../exceptions/http-object-invalid.exception';

@Injectable()
export class ImageProfile implements PipeTransform {
  async transform(payload) {
    if (typeof payload.payload !== 'object' && !Array.isArray(payload.payload))
      throw new HttpExceptionObjectInvalid();

    if (!Array.isArray(payload.payload)) {
      if (Object.keys(payload.payload).length == 0)
        throw new HttpExceptionObjectInvalid();
      return payload;
    }

    if (payload.payload.length > 0) {
      payload.payload = payload.payload[0];
      if (
        typeof payload.payload !== 'object' &&
        !Array.isArray(payload.payload)
      )
        throw new HttpExceptionObjectInvalid();

      if (Object.keys(payload.payload).length == 0)
        throw new HttpExceptionObjectInvalid();

      return payload;
    }
    throw new HttpExceptionObjectInvalid();
  }
}
