import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async getOne(username: string) {
    return await this.userModel.findOne({ username: username });
  }

  async existUsername(username: string) {
    return await this.userModel.exists({
      username,
    });
  }

  async existEmail(email: string) {
    return await this.userModel.exists({
      email,
    });
  }

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
}
