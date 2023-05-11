import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { CreateStatisticDto } from './dto/create-statistic.dto';

@Injectable()
export class StatisticsRepository {
  constructor(private readonly db: DatabaseService) {}

  private lexiconProgressSelect = {
    id: true,
    progressCount: true,
    isLearned: true,
    wordId: true,
  };

  public async createOrUpdateStatistics(
    userId: number,
    createStatisticDto: CreateStatisticDto,
  ): Promise<void> {
    const today = new Date();
    const todayISO = today.toISOString().substring(0, 10);

    await this.db.statistics.upsert({
      where: {
        date_userId: {
          date: new Date(todayISO),
          userId,
        },
      },
      create: {
        words: createStatisticDto?.words || 0,
        tasks: createStatisticDto?.tasks || 0,
        quizPoints: createStatisticDto?.quizPoints || 0,
        date: new Date(todayISO),
        user: {
          connect: {
            id: userId,
          },
        },
      },
      update: {
        words: {
          increment: createStatisticDto?.words || 0,
        },
        tasks: {
          increment: createStatisticDto?.tasks || 0,
        },
        quizPoints: {
          increment: createStatisticDto?.quizPoints || 0,
        },
      },
    });
  }

  // public async getLexiconProgress(
  //   userId: number,
  //   wordId: number,
  // ): Promise<LexiconProgressResponse> {
  //   return await this.db.lexiconProgress.findUnique({
  //     where: {
  //       userId_wordId: {
  //         userId: userId,
  //         wordId: wordId,
  //       },
  //     },
  //     select: this.lexiconProgressSelect,
  //   });
  // }

  // public async createOrUpdateLexiconProgress(
  //   userId: number,
  //   wordId: number,
  //   progressCount: number,
  //   isLearned: boolean,
  // ): Promise<LexiconProgressResponse> {
  //   return await this.db.lexiconProgress.upsert({
  //     where: {
  //       userId_wordId: {
  //         userId: userId,
  //         wordId: wordId,
  //       },
  //     },
  //     create: {
  //       progressCount,
  //       isLearned,
  //       user: {
  //         connect: {
  //           id: userId,
  //         },
  //       },
  //       word: {
  //         connect: {
  //           id: wordId,
  //         },
  //       },
  //     },
  //     update: {
  //       progressCount,
  //       isLearned,
  //     },
  //     select: this.lexiconProgressSelect,
  //   });
  // }
}
