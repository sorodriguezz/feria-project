import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ModulesModule } from './modules/modules.module';
import { moduleConfig } from './config/module.config';
import { mongooseConfig } from './config/mongoose.config';

@Module({
  imports: [moduleConfig, mongooseConfig, CoreModule, ModulesModule],
})
export class AppModule {}
