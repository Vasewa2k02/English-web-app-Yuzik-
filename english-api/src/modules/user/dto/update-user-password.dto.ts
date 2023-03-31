import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class UpdateUserPasswordDto {
  @ApiProperty()
  @Matches(/^.{4,16}$/)
  oldPassword: string;

  @ApiProperty()
  @Matches(/^.{4,16}$/)
  newPassword: string;
}
