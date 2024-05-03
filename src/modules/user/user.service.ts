import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './../../core/entities/user.entity';
import { UserRepository } from './../../core/repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
    return await this.userRepository.create(createUserDto);
  }
}
