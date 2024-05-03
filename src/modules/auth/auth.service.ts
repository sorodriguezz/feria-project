import { UserRepository } from './../../core/repositories/user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async signIn({ username, password }: AuthDto) {
    const user = await this.userRepository.getOne(username);

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = {
      username: user.username,
    };

    return {
      email: user.email,
      username: user.username,
      token: await this.jwtService.signAsync(payload),
    };
  }
}
