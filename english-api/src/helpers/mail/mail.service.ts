import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

import { NodemailerTransport } from './nodemailer-transport.class';

@Injectable()
export class MailService {
  private transport: nodemailer.Transporter;

  constructor(
    private readonly nodemailerTransport: NodemailerTransport,
    private readonly configService: ConfigService,
  ) {}

  public async sendFirstPasswordForUser(
    firstPassword: string,
    reciver: string,
  ): Promise<void> {
    const transportOptions =
      this.nodemailerTransport.setConnectionTimeout(5000);

    try {
      this.transport = nodemailer.createTransport({
        ...transportOptions,
      });

      await this.transport.sendMail({
        to: reciver,
        from: this.configService.get('SMTP_USER'),
        subject: 'Активация аккаунта на ' + this.configService.get('API_URL'),
        html: `
      <div>
        <h1>Пароль:</h1>
        <p>${firstPassword}</p>
      </div>`,
      });

      this.transport.close();
    } catch (error) {
      this.transport.close();
      throw error;
    }
  }
}
