import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { UserService } from './user.service';

@Module({
  providers: [PrismaService, UserService],
})
export class UserModule {}
