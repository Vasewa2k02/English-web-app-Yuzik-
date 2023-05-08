import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';

import { UpdateUserSettingsDto } from './dto/update-user-setting.dto';
import { UserSettingsResponse } from './response/user-settings.response';

@Injectable()
export class UserSettingsRepository {
  constructor(private readonly db: DatabaseService) {}

  public async getUserSettings(userId: number): Promise<UserSettingsResponse> {
    return await this.db.userSettings.findUnique({
      where: { userId },
    });
  }
  public async update(
    userId: number,
    updateUserSettingsDto: UpdateUserSettingsDto,
  ): Promise<void> {
    await this.db.userSettings.update({
      where: { userId },
      data: { ...updateUserSettingsDto },
    });
  }
}
