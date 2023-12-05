import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import * as cookie from 'cookie';

import { SessionService } from '../session/session.service';
import { UserResponse } from '../user/response/user.response';
import { UserService } from '../user/user.service';
import { UserRegistrationDto } from './dto/user-registration.dto';
import CookieWithRefreshToken from './interface/cookie-with-refresh-token.interface';
import RequestWithUser from './interface/request-with-user.interface';
import TokenPayload from './interface/token-payload.interface';
import { AccessTokenResponse } from './response/access-token.response';
import { UserLoginResponse } from './response/user-login.reponse';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
    private readonly configService: ConfigService,
  ) {}

  private getCookieForLogout(): string {
    const cookieForLogout = cookie.serialize('refreshToken', null, {
      httpOnly: true,
      path: '/',
      maxAge: 0,
    });

    return cookieForLogout;
  }

  public getAccessJwtToken(userId: number): string {
    const payload: TokenPayload = { userId };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    return token;
  }

  public async getAuthenticatedUser(
    email: string,
    plainTextPassword: string,
  ): Promise<UserResponse> {
    try {
      const user = await this.userService.getUserByEmailWithPassword(email);

      await this.verifyPassword(plainTextPassword, user.password);

      return user;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public getCookieWithJwtRefreshToken(userId: number): CookieWithRefreshToken {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    const refreshTokenCookie = cookie.serialize('refreshToken', token, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });
    return {
      refreshTokenCookie,
      token,
    };
  }

  public async getCurrentUser(req: RequestWithUser): Promise<UserResponse> {
    return await this.userService.getFullUserById(req.user.id);
  }

  public async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: number,
  ): Promise<UserResponse> {
    console.log(await this.sessionService.getRefreshToken(userId));

    if (refreshToken !== (await this.sessionService.getRefreshToken(userId))) {
      throw new HttpException('XUIXUXI', HttpStatus.FORBIDDEN);
    }

    return await this.userService.getUserById(userId);
  }

  public async login(req: RequestWithUser): Promise<UserLoginResponse> {
    const accessToken = this.getAccessJwtToken(req.user.id);

    const { refreshTokenCookie, token: refreshToken } =
      this.getCookieWithJwtRefreshToken(req.user.id);

    await this.sessionService.createOrUpdateSessionByUserId(
      req.user.id,
      refreshToken,
    );

    const user = await this.userService.getFullUserById(req.user.id);

    req.res.setHeader('Set-Cookie', refreshTokenCookie);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  public async refresh(req: RequestWithUser): Promise<AccessTokenResponse> {
    const accessToken = this.getAccessJwtToken(req.user.id);

    const { refreshTokenCookie, token: refreshToken } =
      this.getCookieWithJwtRefreshToken(req.user.id);

    await this.sessionService.createOrUpdateSessionByUserId(
      req.user.id,
      refreshToken,
    );

    req.res.setHeader('Set-Cookie', refreshTokenCookie);

    return { accessToken };
  }

  public async registration(
    registrationDto: UserRegistrationDto,
  ): Promise<void> {
    await this.userService.create(registrationDto);
  }

  public async removeRefreshToken(req: RequestWithUser): Promise<void> {
    await this.sessionService.removeRefreshToken(req.user.id);

    req.res.setHeader('Set-Cookie', this.getCookieForLogout());
  }

  public async verifyPassword(
    enteredPassword: string,
    password: string,
  ): Promise<void> {
    if (!(await bcrypt.compare(enteredPassword, password))) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
