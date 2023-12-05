import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';

import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonResponse } from './response/lesson.response';

@Injectable()
export class LessonRepository {
  private lessonWithTasksSelect = {
    id: true,
    name: true,
    theory: true,
    tasks: {
      select: {
        id: true,
        englishSentence: true,
        russianSentence: true,
      },
    },
    topic: {
      select: {
        id: true,
        name: true,
      },
    },
  };

  constructor(private readonly db: DatabaseService) {}

  public async createLesson(
    createLessonDto: CreateLessonDto,
  ): Promise<LessonResponse> {
    const { topicName, ...dto } = createLessonDto;

    const lesson = await this.db.lesson.create({
      data: {
        ...dto,
        topic: {
          connectOrCreate: {
            where: { name: topicName },
            create: { name: topicName },
          },
        },
      },
      select: this.lessonWithTasksSelect,
    });

    return lesson;
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

  public async getLessonById(id: number): Promise<LessonResponse> {
    return await this.db.lesson.findUnique({
      where: { id },
      select: this.lessonWithTasksSelect,
    });
  }

  public async getLessons(): Promise<LessonResponse[]> {
    return await this.db.lesson.findMany({
      orderBy: { id: 'asc' },
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

  public async removeLesson(id: number): Promise<void> {
    const topicLessonsCount = await this.db.topic.findFirst({
      where: {
        lessons: {
          some: {
            id,
          },
        },
      },
      select: {
        id: true,
        lessons: {
          select: {
            _count: true,
          },
        },
      },
    });

    if (topicLessonsCount.lessons.length === 1) {
      await this.db.topic.delete({
        where: {
          id: topicLessonsCount.id,
        },
      });
    } else {
      await this.db.lesson.delete({
        where: {
          id,
        },
      });
    }
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
}
