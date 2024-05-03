import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './../../core/entities/user.entity';
import { UserRepository } from './../../core/repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    createUserDto.password = bcrypt.hashSync(createUserDto.password, salt);
    createUserDto.username = createUserDto.username.toLowerCase().trim();
    createUserDto.email = createUserDto.email.toLowerCase().trim();

    return await this.userRepository.create(createUserDto);
  }
}
