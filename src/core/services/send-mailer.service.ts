import { ConfirmDto } from '../interfaces/confirm.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RegisterDto } from './../../modules/auth/dto/register.dto';

@Injectable()
export class SendMailerService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmationEmail(register: ConfirmDto) {
    try {
      await this.mailerService.sendMail({
        to: register.email,
        subject: '¡Bienvenido! Por favor, verifique su email',
        template: 'confirm',
        context: {
          email: register.email,
          fullname: register.username,
          code: register.authConfirmToken,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendConfirmedEmail(register: RegisterDto) {
    try {
      const { email, username } = register;

      await this.mailerService.sendMail({
        to: email,
        subject: 'Bienvenido a esta aplicación de prueba! Email confirmado',
        template: 'confirmed',
        context: {
          username,
          email,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}