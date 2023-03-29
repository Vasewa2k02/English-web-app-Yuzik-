import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { swaggerType } from 'src/helpers/swagger/utils';
import { UserRoleResponse } from './user-role.response';

export class UserResponse implements Pick<User, 'id' | 'email'> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty(swaggerType(UserRoleResponse))
  role?: UserRoleResponse;
}
