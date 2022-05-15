import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { PrismaService } from './common/servivces/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));

  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
void bootstrap();
