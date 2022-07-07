import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { matchOneItemArrays } from '../utils/auth.helper';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!roles && !permissions) return true;
    if (request.user.roles.includes('super_admin')) return true;
    if (
      matchOneItemArrays(request.user.roles, roles) ||
      matchOneItemArrays(request.user.permissions, permissions)
    )
      return true;
    return false;
  }
}
