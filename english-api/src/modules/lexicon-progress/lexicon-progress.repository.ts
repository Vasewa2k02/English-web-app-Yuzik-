import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { LexiconProgressResponse } from './response/lexicon-progress.response';

@Injectable()
export class LexiconProgressRepository {
  constructor(private readonly db: DatabaseService) {}

  private lexiconProgressSelect = {
    id: true,
    progressCount: true,
    isLearned: true,
    wordId: true,
  };

  public async getLexiconProgress(
    userId: number,
    wordId: number,
  ): Promise<LexiconProgressResponse> {
    return await this.db.lexiconProgress.findUnique({
      where: {
        userId_wordId: {
          userId: userId,
          wordId: wordId,
        },
      },
      select: this.lexiconProgressSelect,
    });
  }

  public async createOrUpdateLexiconProgress(
    userId: number,
    wordId: number,
    progressCount: number,
    isLearned: boolean,
  ): Promise<LexiconProgressResponse> {
    return await this.db.lexiconProgress.upsert({
      where: {
        userId_wordId: {
          userId: userId,
          wordId: wordId,
        },
      },
      create: {
        progressCount,
        isLearned,
        user: {
          connect: {
            id: userId,
          },
        },
        word: {
          connect: {
            id: wordId,
          },
        },
      },
      update: {
        progressCount,
        isLearned,
      },
      select: this.lexiconProgressSelect,
    });
  }
}
