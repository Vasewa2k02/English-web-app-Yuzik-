import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import RequestWithUser from './interface/request-with-user.interface';
import { swaggerType } from 'src/helpers/swagger/utils';
import { UserResponse } from '../../modules/user/response/user.response';
import { AuthService } from './auth.service';
import { UserRegistrationDto } from './dto/user-registration.dto';
import JwtRefreshGuard from './guard/jwt-refresh.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AccessTokenResponse } from './response/access-token.response';
import { UserLoginResponse } from './response/user-login.reponse';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse()
  @HttpCode(HttpStatus.CREATED)
  @Post('registration')
  public registration(
    @Body() registrationDto: UserRegistrationDto,
  ): Promise<void> {
    return this.authService.registration(registrationDto);
  }

  @ApiOkResponse(swaggerType(UserLoginResponse))
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public login(@Req() req: RequestWithUser): Promise<UserLoginResponse> {
    return this.authService.login(req);
  }

  @ApiOkResponse(swaggerType(UserResponse))
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  public getCurrentUser(@Req() req: RequestWithUser) {
    return this.authService.getCurrentUser(req);
  }

  @ApiOkResponse(swaggerType(AccessTokenResponse))
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  public refresh(@Req() req: RequestWithUser): Promise<AccessTokenResponse> {
    return this.authService.refresh(req);
  }

  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  public logout(@Req() req: RequestWithUser): Promise<void> {
    return this.authService.removeRefreshToken(req);
  }
}
