import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule } from '@nestjs/config';
import { NodemailerTransport } from './nodemailer-transport.class';

@Module({
  imports: [ConfigModule],
  providers: [MailService, NodemailerTransport],
  exports: [MailService],
})
export class MailModule {}
