import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CoreModule } from 'src/core/core.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [CoreModule],
})
export class UserModule {}
