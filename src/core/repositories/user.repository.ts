import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async getOne(username: string) {
    return await this.userModel.findOne({ username: username });
  }

  async exist(username: string) {
    return await this.userModel.exists({
      username: username,
    });
  }

  async create(createUserDto: CreateUserDto) {
    const exist = await this.exist(createUserDto.username);

    if (exist) {
      throw new ConflictException();
    }
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
}
