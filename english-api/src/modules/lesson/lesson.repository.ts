import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';

import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonResponse } from './response/lesson.response';

@Injectable()
export class LessonRepository {
  constructor(private readonly db: DatabaseService) {}

  private lessonWithTasksSelect = {
    id: true,
    name: true,
    theory: true,
    passingPercent: true,
    tasks: {
      select: {
        id: true,
        englishSentence: true,
        russianSentence: true,
      },
    },
  };

  public async createLesson(
    createLessonDto: CreateLessonDto,
  ): Promise<LessonResponse> {
    return await this.db.lesson.create({
      data: {
        ...createLessonDto,
      },
      select: this.lessonWithTasksSelect,
    });
  }

  public async getLessonById(id: number): Promise<LessonResponse> {
    return await this.db.lesson.findUnique({
      where: { id },
      select: this.lessonWithTasksSelect,
    });
  }

  public async getNextLessonById(id: number): Promise<LessonResponse> {
    return await this.db.lesson.findFirst({
      where: {
        id: { gt: id },
      },
      orderBy: { id: 'asc' },
      select: this.lessonWithTasksSelect,
    });
  }

  public async getAdminLessons(): Promise<LessonResponse[]> {
    return await this.db.lesson.findMany({
      orderBy: { id: 'asc' },
      select: this.lessonWithTasksSelect,
    });
  }

  public async getLearnLessons(lessonId: number): Promise<LessonResponse[]> {
    return await this.db.lesson.findMany({
      where: {
        id: {
          lte: lessonId,
        },
      },
      select: this.lessonWithTasksSelect,
    });
  }

  public async updateLesson(
    id: number,
    updateLessonDto: UpdateLessonDto,
  ): Promise<LessonResponse> {
    return await this.db.lesson.update({
      where: {
        id,
      },
      data: {
        ...updateLessonDto,
      },
      select: this.lessonWithTasksSelect,
    });
  }

  public async removeLesson(id: number): Promise<void> {
    await this.db.lesson.delete({
      where: {
        id,
      },
    });
  }
}
