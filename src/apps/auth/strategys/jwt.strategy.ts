import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthApp } from '../apps/auth.service';
import { configLoader } from '../../../config/configs/env.configs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authApp: AuthApp) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configLoader().modules.auth.jwt_secret,
    });
  }

  async validate(payload: any) {
    const user = await this.authApp.getAuthUserByUuid(payload.uuid);
    if (!user) return new UnauthorizedException();
    if (user.enabled != true) throw new UnauthorizedException();
    return { ...user, device_uuid: payload.device_uuid };
  }
}
