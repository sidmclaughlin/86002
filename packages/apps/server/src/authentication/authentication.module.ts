import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthenticationService } from './authentication.service';
import { LocalSerialzer } from './serializers/local.serializer';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthenticationService, LocalSerialzer, LocalStrategy, PrismaService, UserService],
})
export class AuthenticationModule {}
