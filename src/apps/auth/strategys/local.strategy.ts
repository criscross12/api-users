import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthApp } from '../apps/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authApp: AuthApp, private logger: Logger) {
    super({
      usernameField: 'user',
      passwordField: 'password',
    });
  }
  async validate(data: string, password: string): Promise<any> {
    this.logger.log('Authenticate by credentials', 'AuthLogin');
    const userRes = await this.authApp.validateUser(data, password);
    if (!userRes) throw new UnauthorizedException();
    if (userRes.enabled != true) throw new UnauthorizedException();
    return userRes;
  }
}
