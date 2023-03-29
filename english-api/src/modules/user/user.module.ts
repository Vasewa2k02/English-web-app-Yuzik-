import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from 'src/helpers/mail/mail.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [DatabaseModule, ConfigModule, MailModule],
  exports: [UserService],
})
export class UserModule {}
