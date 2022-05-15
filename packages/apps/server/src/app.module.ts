import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { LoggerModule } from 'nestjs-pino';
import { Environment } from './common/dtos/environment.dto';

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
  ],
})
export class AppModule {}
