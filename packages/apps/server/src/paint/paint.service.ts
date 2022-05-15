import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/servivces/prisma/prisma.service';

@Injectable()
export class PaintService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPaints() {
    return await this.prismaService.paint.findMany();
  }

  async getPaint(id: number) {
    return await this.prismaService.paint.findUnique({ where: { id: id } });
  }
}
