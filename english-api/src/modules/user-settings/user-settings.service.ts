import { Injectable } from '@nestjs/common';
import { UpdateUserSettingsDto } from './dto/update-user-setting.dto';
import { UserSettingsResponse } from './response/user-settings.response';
import { UserSettingsRepository } from './user-settings.repository';

@Injectable()
export class UserSettingsService {
  constructor(
    private readonly userSettingsRepository: UserSettingsRepository,
  ) {}

  async getUserSettings(userId: number): Promise<UserSettingsResponse> {
    return await this.userSettingsRepository.getUserSettings(userId);
  }

  async update(
    userId: number,
    updateUserSettingsDto: UpdateUserSettingsDto,
  ): Promise<void> {
    await this.userSettingsRepository.update(userId, updateUserSettingsDto);
  }
}
