import { Injectable } from '@nestjs/common';
import { CreateGrammarProgressDto } from './dto/create-grammar-progress.dto';
import { UpdateGrammarProgressDto } from './dto/update-grammar-progress.dto';
import { GrammarProgressRepository } from './grammar-progress.repository';

@Injectable()
export class GrammarProgressService {
  constructor(
    private readonly grammarProgressRepository: GrammarProgressRepository,
  ) {}

  public async getCountComplitedTasksInLesson(
    userId: number,
    lessonId: number,
  ): Promise<number> {
    return await this.grammarProgressRepository.getCountComplitedTasksInLesson(
      userId,
      lessonId,
    );
  }

  public async createOrUpdateGrammarProgress(
    userId: number,
    taskId: number,
  ): Promise<void> {
    await this.grammarProgressRepository.createOrUpdateGrammarProgress(
      userId,
      taskId,
    );
  }
}
