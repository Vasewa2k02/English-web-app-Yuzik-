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
}

type RoleOmitUserId = Omit<Role, 'userId'>;

export class UserRoleResponse implements RoleOmitUserId {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty(swaggerType(RolePermissions))
  permissions: RolePermissions[];
}
