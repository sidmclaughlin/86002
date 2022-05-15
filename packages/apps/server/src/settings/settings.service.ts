import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/servivces/prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getSettings() {
    return await this.prismaService.settings.findFirst({ select: { threshold_stock_low: true } });
  }
}
