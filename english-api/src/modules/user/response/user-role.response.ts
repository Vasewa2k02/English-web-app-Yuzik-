import { ApiProperty } from '@nestjs/swagger';
import { Method, Permission, Role } from '@prisma/client';
import { swaggerType } from '../../../helpers/swagger/utils';

type PermissionsOmitRoleId = Omit<Permission, 'roleId'>;

class RolePermissions implements PermissionsOmitRoleId {
  @ApiProperty()
  id: number;

  @ApiProperty()
  descriptor: string;

  @ApiProperty({ enum: Method })
  method: Method;

  @ApiProperty()
  context: string | null;
}

type RoleOmitUserId = Omit<Role, 'userId'>;

export class UserRoleResponse implements RoleOmitUserId {
  @ApiProperty(swaggerType(RolePermissions))
  permissions: RolePermissions[];
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;
}
