import { Injectable } from '@nestjs/common';

import { GrammarProgressRepository } from './grammar-progress.repository';
import { GrammarProgressResponse } from './response/grammar-progress.response';

@Injectable()
export class GrammarProgressService {
  constructor(
    private readonly grammarProgressRepository: GrammarProgressRepository,
  ) {}

  public async createOrUpdateGrammarProgress(
    userId: number,
    taskId: number,
  ): Promise<void> {
    await this.grammarProgressRepository.createOrUpdateGrammarProgress(
      userId,
      taskId,
    );
  }

  public async getCountComplitedTasksInLesson(
    userId: number,
    lessonId: number,
  ): Promise<number> {
    return await this.grammarProgressRepository.getCountComplitedTasksInLesson(
      userId,
      lessonId,
    );
  }

  public async getAllByUserId(
    userId: number,
  ): Promise<GrammarProgressResponse[]> {
    return await this.grammarProgressRepository.getAllByUserId(userId);
  }
}
