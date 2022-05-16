import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { AUTHORIZE } from '../decorators/authorize.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(AUTHORIZE, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('requiredRoles: ', requiredRoles);
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    console.log('user: ', user);
    return user ? requiredRoles.some(role => user.role.includes(role)) : false;
  }
}
