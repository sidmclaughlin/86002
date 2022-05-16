import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const AUTHORIZE = 'AUTHORIZE';
export const Authorize = (...roles: Role[]) => SetMetadata(AUTHORIZE, roles);
