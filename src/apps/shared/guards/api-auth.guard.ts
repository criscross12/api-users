import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { configLoader } from 'src/config/configs/env.configs';

@Injectable()
export class ApiAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const configEnv = configLoader();
    const request = context.switchToHttp().getRequest();

    const apiToken = request.headers['api-token'];

    if (!apiToken) throw new UnauthorizedException();
    if (apiToken !== configEnv.apis.api_token)
      throw new UnauthorizedException();
    return true;
  }
}
