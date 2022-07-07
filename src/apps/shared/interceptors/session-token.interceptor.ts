import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionsService } from 'src/apps/auth/services/sessions.service';

@Injectable()
export class SessionTokenInterceptor implements NestInterceptor {
  constructor(private readonly sessionsService: SessionsService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

    const tokenBearer: string = req.headers['authorization'];
    if (!tokenBearer) throw new UnauthorizedException();
    const token = tokenBearer.split(' ')[1];
    const session = await this.sessionsService.getSessionBytoken(token);
    if (!session) throw new UnauthorizedException();

    return next.handle().pipe(tap(() => undefined));
  }
}
