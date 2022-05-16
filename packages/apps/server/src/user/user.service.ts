import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/servivces/prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      select: { id: true, email: true, name: true, role: true },
      where: { email: email },
    });
    if (!user) throw new NotFoundException();

    return user;
  }

  async findById(id: number) {
    const user = await this.prismaService.user.findUnique({
      select: { id: true, email: true, name: true, role: true },
      where: { id: id },
    });
    if (!user) throw new NotFoundException();

    return user;
  }
}
