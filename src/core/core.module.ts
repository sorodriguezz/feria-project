import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseEntitiesConfig } from 'src/config/mongoose-entities.config';
import { jwtConfig } from './../config/jwt.config';
import { UserRepository } from './repositories/user.repository';
import { SendMailerService } from './services/send-mailer.service';

@Module({
  imports: [mongooseEntitiesConfig, jwtConfig],
  providers: [UserRepository, SendMailerService],
  exports: [MongooseModule, JwtModule, UserRepository, SendMailerService],
})
export class CoreModule {}
