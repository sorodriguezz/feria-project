import { Module } from '@nestjs/common';
import { moduleConfig } from './config/module.config';
import { mongooseConfig } from './config/mongoose.config';
import { ModulesModule } from './modules/modules.module';
import { mailerConfig } from './config/mailer.config';

@Module({
  imports: [moduleConfig, mongooseConfig, mailerConfig, ModulesModule],
})
export class AppModule {}
