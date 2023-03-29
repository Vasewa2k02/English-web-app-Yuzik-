import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { UserResponse } from '../../user/response/user.response';
import { AuthService } from '../auth.service';
import TokenPayload from '../interface/token-payload.interface';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.refreshToken;
        },
      ]),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  public async validate(
    request: Request,
    payload: TokenPayload,
  ): Promise<UserResponse> {
    return this.authService.getUserIfRefreshTokenMatches(
      request?.cookies?.refreshToken,
      payload.userId,
    );
  }
}
