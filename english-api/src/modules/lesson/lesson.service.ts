import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonRepository } from './lesson.repository';
import { LessonResponse } from './response/lesson.response';

@Injectable()
export class LessonService {
  constructor(private readonly lessonRepository: LessonRepository) {}

  async createLesson(
    createLessonDto: CreateLessonDto,
  ): Promise<LessonResponse> {
    return await this.lessonRepository.createLesson(createLessonDto);
  }

  async getAdminLessons(): Promise<LessonResponse[]> {
    return await this.lessonRepository.getAdminLessons();
  }

  async updateLesson(
    id: number,
    updateLessonDto: UpdateLessonDto,
  ): Promise<LessonResponse> {
    await this.checkLessonExistence(id);
    return await this.lessonRepository.updateLesson(id, updateLessonDto);
  }

  async removeLesson(id: number): Promise<void> {
    await this.checkLessonExistence(id);
    await this.lessonRepository.removeLesson(id);
  }

  private async checkLessonExistence(id: number): Promise<void> {
    const lesson = await this.lessonRepository.getLessonById(id);

    if (!lesson) {
      throw new NotFoundException('This lesson doesn`t exist');
    }
  }
}
