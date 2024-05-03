import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [CoreModule],
})
export class AuthModule {}
