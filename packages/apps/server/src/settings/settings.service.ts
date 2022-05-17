import { UpdateSettingsDto } from '@86002/core-kit';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getSettings() {
    return await this.prismaService.settings.findFirst({ select: { threshold_stock_low: true } });
  }

  async updateSettings(data: UpdateSettingsDto) {
    const settings = await this.prismaService.settings.findFirst({ select: { id: true } });
    if (!settings) throw new NotFoundException();

    return await this.prismaService.settings.update({ where: { id: settings.id }, data: data });
  }
}
