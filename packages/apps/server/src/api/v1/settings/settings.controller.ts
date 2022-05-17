import { UpdateSettingsDto } from '@86002/core-kit';
import { Body, Controller, Get, Patch } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PublicRoute } from 'src/authentication/decorators/public-route.decorator';
import { Authorize } from 'src/authorization/decorators/authorize.decorator';
import { SettingsService } from 'src/settings/settings.service';

@Controller({
  path: 'settings',
  version: '1',
})
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @PublicRoute()
  getSettings() {
    return this.settingsService.getSettings();
  }

  @Patch()
  @Authorize(Role.ADMIN)
  updateSettings(@Body() data: UpdateSettingsDto) {
    return this.settingsService.updateSettings(data);
  }
}
