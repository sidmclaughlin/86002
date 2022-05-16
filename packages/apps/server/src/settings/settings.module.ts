import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { SettingsService } from './settings.service';

@Module({
  providers: [PrismaService, SettingsService],
})
export class SettingsModule {}
