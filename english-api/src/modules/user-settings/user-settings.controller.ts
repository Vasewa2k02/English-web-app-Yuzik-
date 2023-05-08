import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { UpdateUserSettingsDto } from './dto/update-user-setting.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import RequestWithUser from '../auth/interface/request-with-user.interface';
import { UserSettingsResponse } from './response/user-settings.response';

@ApiTags('user-settings')
@Controller('user-settings')
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getUserSettings(@Req() req: RequestWithUser): Promise<UserSettingsResponse> {
    return this.userSettingsService.getUserSettings(+req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch()
  update(
    @Req() req: RequestWithUser,
    @Body() updateUserSettingsDto: UpdateUserSettingsDto,
  ): Promise<void> {
    return this.userSettingsService.update(+req.user.id, updateUserSettingsDto);
  }
}
