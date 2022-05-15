import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { Environment } from './common/dtos/environment.dto';
import { PrismaService } from './common/servivces/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService: ConfigService<Environment, true> = app.get(ConfigService);
  const prismaService = app.get(PrismaService);

  prismaService.enableShutdownHooks(app);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useLogger(app.get(Logger));
  app.setGlobalPrefix('api');
  app.enableVersioning();
  app.enableCors();

  await app.listen(configService.get('SERVER_PORT'), configService.get('SERVER_HOST'));
}
void bootstrap();
