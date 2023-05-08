import { Module } from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { UserSettingsController } from './user-settings.controller';
import { UserSettingsRepository } from './user-settings.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [UserSettingsController],
  providers: [UserSettingsService, UserSettingsRepository],
  imports: [DatabaseModule],
  exports: [UserSettingsService],
})
export class UserSettingsModule {}
