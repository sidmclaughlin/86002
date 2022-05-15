import { Module } from '@nestjs/common';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { PrismaService } from 'src/common/servivces/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthenticationController } from './authentication/authentication.controller';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, PrismaService, UserService],
})
export class ApiV1Module {}
