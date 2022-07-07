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
export class RecoveryPasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (!configLoader().flats.recovery_password_available)
      throw new HttpHandleException(
        new Error(UserMessagesEnum.RECOVERY_PASSWORD_NOT_AVAILABLE),
      );

    return next.handle();
  }
}
