import { ConfigModule } from '@nestjs/config';
import configuration from './env.config';

export const moduleConfig = ConfigModule.forRoot({
  isGlobal: true,
  cache: true,
  load: [configuration],
});
