import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly prismaService: PrismaService, private readonly userService: UserService) {}

  async login(data: LoginDto) {
    const user = await this.prismaService.user.findUnique({ where: { email: data.email } });
    if (!user) throw new UnauthorizedException();

    const valid = await compare(data.password, user.password);
    if (!valid) throw new UnauthorizedException();

    return this.userService.findById(user.id);
  }
}
