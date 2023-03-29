import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';

type UserRegistrationType = Pick<User, 'email' | 'name'>;

export class CreateUserDto implements UserRegistrationType {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;
}
