import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());

  const localConfigService = app.get(ConfigService);

  const baseUri = localConfigService.get<string>('baseUri');

  app.setGlobalPrefix(baseUri);

  await app.listen(localConfigService.get<string>('port'));
}
bootstrap();
