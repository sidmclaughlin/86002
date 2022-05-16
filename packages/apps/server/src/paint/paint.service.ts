import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/servivces/prisma/prisma.service';
import { UpdatePaintDto } from './dtos/update-paint.dto';

@Injectable()
export class PaintService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPaints() {
    return await this.prismaService.paint.findMany();
  }

  async getPaint(id: number) {
    return await this.prismaService.paint.findUnique({ where: { id: id } });
  }

  async updatePaint(id: number, data: UpdatePaintDto) {
    return await this.prismaService.paint.update({ where: { id: id }, data: data });
  }
}
