import { AuthProperties } from './../../core/properties/auth.propertie';
import { SendMailerService } from './../../core/services/send-mailer.service';
import { User } from 'src/core/entities/user.entity';
import { UserRepository } from './../../core/repositories/user.repository';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';
import { RegisterDto } from './dto/register.dto';
import { generateCodeHelper } from 'src/core/helpers/generate-code.helper';
import { ConfirmDto } from '../../core/interfaces/confirm.dto';
import { VerifyDto } from './dto/verify.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly sendMailerService: SendMailerService,
  ) {}

  async signIn({ email, password }: SignInDto) {
    const user = await this.userRepository.getOneByEmail(
      email.toLowerCase().trim(),
    );

    if (!user) {
      throw new HttpException('Usuario no existe', HttpStatus.BAD_REQUEST);
    }

    if (!user.status && !user.isVerified) {
      throw new UnauthorizedException();
    }

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

  async register({
    email,
    password,
    name,
    username,
  }: RegisterDto): Promise<User> {
    {
      const existUsername = await this.userRepository.existUsername(username);
      if (existUsername) {
        throw new ConflictException('Nombre de usuario ya existe');
      }
    }
    {
      const existEmail = await this.userRepository.existEmail(email);

      if (existEmail) {
        throw new ConflictException('Email de usuario ya existe');
      }
    }

    const salt = await bcrypt.genSalt();
    const code = generateCodeHelper().toString();

    const userInsert: ConfirmDto = {
      password: bcrypt.hashSync(password, salt),
      username: username.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      authConfirmToken: code,
      name,
    };

    const createUser = await this.userRepository.create(userInsert);

    await this.sendMailerService.sendConfirmationEmail(userInsert);

    return createUser;
  }

  async verifyAccount({ code, email }: VerifyDto) {
    const user = await this.userRepository.getOneByEmail(email);

    if (!user) {
      throw new HttpException('Usuario no existe', HttpStatus.BAD_REQUEST);
    }

    if (!user.authConfirmToken) {
      throw new HttpException('Email incorrecto', HttpStatus.BAD_REQUEST);
    }

    if (user.attempts >= AuthProperties.USER_ATTEMPTS) {
      throw new HttpException(
        'Excedio el número de intentos',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.userRepository.updateByEmailAndAttempts(
      user.email,
      user.attempts + AuthProperties.USER_ATTEMPTS_AGG,
    );

    if (user.authConfirmToken !== code) {
      throw new HttpException('Código incorrecto', HttpStatus.UNAUTHORIZED);
    }

    await this.userRepository.updateByEmail(user.email);
    await this.sendMailerService.sendConfirmedEmail(user);

    return true;
  }
}
