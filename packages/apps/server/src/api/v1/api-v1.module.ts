import { Module } from '@nestjs/common';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { PrismaService } from 'src/common/servivces/prisma/prisma.service';
import { PaintService } from 'src/paint/paint.service';
import { SettingsService } from 'src/settings/settings.service';
import { UserService } from 'src/user/user.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { PaintController } from './paint/paint.controller';
import { SettingsController } from './settings/settings.controller';

@Module({
  controllers: [AuthenticationController, SettingsController, PaintController],
  providers: [AuthenticationService, PaintService, PrismaService, SettingsService, UserService],
})
export class ApiV1Module {}
