import { Module } from '@nestjs/common';
import { moduleConfig } from './config/module.config';
import { mongooseConfig } from './config/mongoose.config';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [moduleConfig, mongooseConfig, ModulesModule],
})
export class AppModule {}
