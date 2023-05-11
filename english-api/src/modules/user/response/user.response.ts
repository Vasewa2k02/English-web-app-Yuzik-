import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { swaggerType } from 'src/helpers/swagger/utils';
import { UserSettingsResponse } from 'src/modules/user-settings/response/user-settings.response';
import { UserRoleResponse } from './user-role.response';

export class UserResponse
  implements Pick<User, 'id' | 'email' | 'roleId' | 'idEnableLesson'>
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  roleId: number;

  @ApiProperty()
  idEnableLesson: number;

  @ApiProperty(swaggerType(UserRoleResponse))
  role?: UserRoleResponse;

  @ApiProperty(swaggerType(UserSettingsResponse))
  settings?: UserSettingsResponse;
}
