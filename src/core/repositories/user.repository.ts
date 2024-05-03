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

  async getOneByUsername(username: string) {
    return await this.userModel.findOne({ username: username });
  }

  async getOneByEmail(email: string) {
    return await this.userModel.findOne({ email });
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

  async updateByEmailAndAttempts(email: string, attempts: number) {
    return await this.userModel.updateOne(
      { email },
      {
        attempts: attempts,
      },
    );
  }

  async updateByEmail(email: string) {
    return await this.userModel.updateOne(
      { email },
      {
        isVerified: true,
        authConfirmToken: null,
        status: true,
        attempts: null,
      },
    );
  }
}
