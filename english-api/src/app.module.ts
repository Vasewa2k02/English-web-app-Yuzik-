import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { SessionModule } from './modules/session/session.module';
import { MailModule } from './helpers/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    UserModule,
    AuthModule,
    DatabaseModule,
    SessionModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
