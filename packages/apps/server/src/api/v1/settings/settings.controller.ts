import { Controller, Get } from '@nestjs/common';
import { PublicRoute } from 'src/authentication/decorators/public-route.decorator';
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
}
