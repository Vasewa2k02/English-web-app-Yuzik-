import { Injectable, NotFoundException } from '@nestjs/common';
import RequestWithUser from '../auth/interface/request-with-user.interface';
import { GrammarProgressService } from '../grammar-progress/grammar-progress.service';
import { UserService } from '../user/user.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonRepository } from './lesson.repository';
import { LessonResponse } from './response/lesson.response';

@Injectable()
export class LessonService {
  constructor(
    private readonly lessonRepository: LessonRepository,
    private readonly grammarProgressService: GrammarProgressService,
    private readonly userService: UserService,
  ) {}

  async createLesson(
    createLessonDto: CreateLessonDto,
  ): Promise<LessonResponse> {
    return await this.lessonRepository.createLesson(createLessonDto);
  }

  async getLessons(): Promise<LessonResponse[]> {
    return await this.lessonRepository.getLessons();
  }

  // async getLearnLessons(req: RequestWithUser): Promise<LessonResponse[]> {
  //   const userId = req.user.id;

  //   const enableLesson = await this.lessonRepository.getLessonById(
  //     req.user.idEnableLesson,
  //   );

  //   const nextEnableLesson = await this.lessonRepository.getNextLessonById(
  //     req.user.idEnableLesson,
  //   );

  //   const countComplitedTasksInLesson =
  //     await this.grammarProgressService.getCountComplitedTasksInLesson(
  //       userId,
  //       req.user.idEnableLesson,
  //     );

  //   if (
  //     !enableLesson ||
  //     (enableLesson.tasks.length !== 0 &&
  //       (100 * countComplitedTasksInLesson) / enableLesson.tasks.length >=
  //         enableLesson.passingPercent)
  //   ) {
  //     await this.userService.updateIdEnableLesson(
  //       userId,
  //       nextEnableLesson?.id || req.user.idEnableLesson,
  //     );

  //     return await this.lessonRepository.getLearnLessons(
  //       nextEnableLesson?.id || req.user.idEnableLesson,
  //     );
  //   }

  //   return await this.lessonRepository.getLearnLessons(
  //     enableLesson?.id || req.user.idEnableLesson,
  //   );
  // }

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
