import { PartialType } from '@nestjs/swagger';
import { CreateUserSettingsDto } from './create-user-setting.dto';

export class UpdateUserSettingsDto extends PartialType(CreateUserSettingsDto) {}
