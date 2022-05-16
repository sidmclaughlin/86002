import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const AUTHORIZE = 'AUTHORIZE';
export const Authorize = (...roles: Role[]) => SetMetadata(AUTHORIZE, roles);
