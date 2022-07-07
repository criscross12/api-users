import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpHandleException } from 'src/apps/shared/exceptions/http-handle.exception';
import { configLoader } from 'src/config/configs/env.configs';
import { UserMessagesEnum } from '../enums/user-error-keys.enum';

@Injectable()
export class RegisterMeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (!configLoader().flats.register_me_available)
      throw new HttpHandleException(
        new Error(UserMessagesEnum.REGISTER_ME_NOT_AVAILABLE),
      );

    return next.handle();
  }
}
