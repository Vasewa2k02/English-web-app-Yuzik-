import {
  Controller,
  Get,
  Body,
  Param,
  UseGuards,
  Patch,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserResponse } from './response/user.response';
import { swaggerType } from 'src/helpers/swagger/utils';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import RequestWithUser from '../auth/interface/request-with-user.interface';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse(swaggerType(UserResponse))
  @Get()
  public findAll(): Promise<UserResponse[]> {
    return this.userService.getAllUsers();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse(swaggerType(UserResponse))
  @Get(':id')
  public findOne(@Param('id') id: string): Promise<UserResponse> {
    return this.userService.getUserById(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse(swaggerType(UserResponse))
  @Patch()
  public changePassword(
    @Req() req: RequestWithUser,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<void> {
    return this.userService.changeUserPassword(req.user, updateUserPasswordDto);
  }
}
