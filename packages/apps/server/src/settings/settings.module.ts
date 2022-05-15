import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/servivces/prisma/prisma.service';
import { SettingsService } from './settings.service';

@Module({
  providers: [PrismaService, SettingsService],
})
export class SettingsModule {}
