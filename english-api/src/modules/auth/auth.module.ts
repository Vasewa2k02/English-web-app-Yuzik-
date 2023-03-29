import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/modules/user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh-token.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { DatabaseModule } from 'src/database/database.module';
import { SessionModule } from 'src/modules/session/session.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtRefreshTokenStrategy, JwtStrategy],
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.register({}),
    DatabaseModule,
    SessionModule,
  ],
})
export class AuthModule {}
