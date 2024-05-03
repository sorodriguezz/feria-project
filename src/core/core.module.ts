import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseEntitiesConfig } from 'src/config/mongoose-entities.config';
import { jwtConfig } from './../config/jwt.config';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [mongooseEntitiesConfig, jwtConfig],
  providers: [UserRepository],
  exports: [MongooseModule, JwtModule, UserRepository],
})
export class CoreModule {}
