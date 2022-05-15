import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { LoggerModule } from 'nestjs-pino';
import { ApiV1Module } from './api/v1/api-v1.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { Environment } from './common/dtos/environment.dto';
import { PrismaService } from './common/servivces/prisma/prisma.service';
import { UserModule } from './user/user.module';
import { SettingsModule } from './settings/settings.module';
import { PaintModule } from './paint/paint.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config: Record<string, unknown>) => {
        const environment = plainToClass(Environment, config, { enableImplicitConversion: true });
        const errors = validateSync(environment, { stopAtFirstError: true, whitelist: true });
        if (errors.length > 0) {
          throw errors[0];
        }

        return environment;
      },
    }),
    UserModule,
    AuthenticationModule,
    ApiV1Module,
    SettingsModule,
    PaintModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthenticationGuard }, PrismaService],
})
export class AppModule {}
