import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/servivces/prisma/prisma.service';
import { PaintService } from './paint.service';

@Module({
  providers: [PaintService, PrismaService],
})
export class PaintModule {}
