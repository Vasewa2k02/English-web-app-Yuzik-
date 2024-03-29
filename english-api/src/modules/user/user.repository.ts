import { Injectable } from '@nestjs/common';
import { LearningMode, User } from '@prisma/client';

import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './response/user.response';

@Injectable()
export class UserRepository {
  private fullUserSelect = {
    id: true,
    name: true,
    email: true,
    roleId: true,
    idEnableLesson: true,
    role: {
      select: {
        id: true,
        title: true,
        permissions: {
          select: {
            id: true,
            method: true,
            descriptor: true,
            context: true,
          },
        },
      },
    },
    settings: {
      select: {
        countRepeatWordForLearned: true,
        countRepeatWordsSimultaneously: true,
        learningModeWords: true,
        learningModeTasks: true,
      },
    },
  };
  private userSelect = {
    id: true,
    email: true,
    roleId: true,
    idEnableLesson: true,
  };

  constructor(private readonly db: DatabaseService) {}

  public async createUser(
    createUserDto: CreateUserDto,
    hashedPassword: string,
  ): Promise<UserResponse> {
    return await this.db.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        settings: {
          create: {
            countRepeatWordForLearned: 4,
            countRepeatWordsSimultaneously: 20,
            learningModeWords: LearningMode.COMBINED,
            learningModeTasks: LearningMode.COMBINED,
          },
        },
      },
      select: this.fullUserSelect,
    });
  }

  public async getAllUsers(): Promise<UserResponse[]> {
    return await this.db.user.findMany({
      select: this.fullUserSelect,
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

  public async getUserByEmail(email: string): Promise<UserResponse> {
    return await this.db.user.findUnique({
      where: {
        email,
      },
      select: this.fullUserSelect,
    });
  }

  public async getUserByEmailWithPassword(email: string): Promise<User> {
    return await this.db.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async getUserById(id: number): Promise<UserResponse> {
    return await this.db.user.findUnique({
      where: {
        id,
      },
      select: this.fullUserSelect,
    });
  }

  public async getUserByIdWithPermissions(id: number): Promise<UserResponse> {
    return await this.db.user.findUnique({
      where: {
        id,
      },
      select: this.fullUserSelect,
    });
  }

  public async updateIdEnableLesson(
    userId: number,
    idEnableLesson: number,
  ): Promise<void> {
    await this.db.user.update({
      where: { id: userId },
      data: { idEnableLesson },
    });
  }

  public async updateUserPassword(
    id: number,
    password: string,
  ): Promise<UserResponse> {
    return await this.db.user.update({
      where: { id },
      data: { password },
      select: this.fullUserSelect,
    });
  }
}
