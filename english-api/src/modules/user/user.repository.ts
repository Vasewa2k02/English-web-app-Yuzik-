import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './response/user.response';

@Injectable()
export class UserRepository {
  constructor(private readonly db: DatabaseService) {}

  private userSelect = {
    id: true,
    email: true,
  };

  private fullUserSelect = {
    id: true,
    email: true,
    role: {
      select: {
        id: true,
        title: true,
        permissions: {
          select: {
            id: true,
            method: true,
            descriptor: true,
          },
        },
      },
    },
  };

  public async createUser(
    createUserDto: CreateUserDto,
    hashedPassword: string,
  ): Promise<UserResponse> {
    return await this.db.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
      select: this.fullUserSelect,
    });
  }

  public async getAllUsers(): Promise<UserResponse[]> {
    return await this.db.user.findMany({
      select: this.userSelect,
    });
  }

  public async getUserById(id: number): Promise<UserResponse> {
    return await this.db.user.findUnique({
      where: {
        id,
      },
      select: this.userSelect,
    });
  }

  public async getUserByEmail(email: string): Promise<UserResponse> {
    return await this.db.user.findUnique({
      where: {
        email,
      },
      select: this.userSelect,
    });
  }

  public async getUserByEmailWithPassword(email: string): Promise<User> {
    return await this.db.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async getUserByIdWithPermissions(id: number): Promise<UserResponse> {
    return await this.db.user.findUnique({
      where: {
        id,
      },
      select: {
        ...this.fullUserSelect,
      },
    });
  }

  public async getHashedUserPassword(id: number): Promise<string> {
    return (
      await this.db.user.findUnique({
        where: {
          id,
        },
        select: {
          password: true,
        },
      })
    ).password;
  }

  public async updateUserPassword(
    id: number,
    password: string,
  ): Promise<UserResponse> {
    return await this.db.user.update({
      where: { id },
      data: { password },
    });
  }
}
