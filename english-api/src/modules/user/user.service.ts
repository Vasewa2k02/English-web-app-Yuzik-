import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/helpers/mail/mail.service';
import { v4 } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UserResponse } from './response/user.response';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    if (await this.userRepository.getUserByEmail(createUserDto.email)) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const userPassword: string = v4().slice(0, 8);

    await this.mailService.sendFirstPasswordForUser(
      userPassword,
      createUserDto.email,
    );

    return await this.userRepository.createUser(
      createUserDto,
      await bcrypt.hash(userPassword, +this.configService.get('SALT')),
    );
  }

  public async getAllUsers(): Promise<UserResponse[]> {
    return await this.userRepository.getAllUsers();
  }

  public async getUserById(id: number): Promise<UserResponse> {
    return await this.userRepository.getUserById(id);
  }

  public async getUserByEmailWithPassword(email: string): Promise<User> {
    return await this.userRepository.getUserByEmailWithPassword(email);
  }

  public async getFullUserById(id: number): Promise<UserResponse> {
    return await this.userRepository.getUserByIdWithPermissions(id);
  }

  public async changeUserPassword(
    user: User,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<void> {
    if (
      !(await bcrypt.compare(
        updateUserPasswordDto.oldPassword,
        await this.userRepository.getHashedUserPassword(user.id),
      ))
    ) {
      throw new HttpException(
        'Old and new passwords not matches',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userRepository.updateUserPassword(
      user.id,
      await bcrypt.hash(
        updateUserPasswordDto.newPassword,
        +this.configService.get('SALT'),
      ),
    );
  }
}
