import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class GrammarProgressRepository {
  constructor(private readonly db: DatabaseService) {}

  public async createOrUpdateGrammarProgress(
    userId: number,
    taskId: number,
  ): Promise<void> {
    await this.db.grammarProgress.upsert({
      where: {
        userId_taskId: {
          userId,
          taskId,
        },
      },
      create: {
        user: {
          connect: {
            id: userId,
          },
        },
        task: {
          connect: {
            id: taskId,
          },
        },
      },
      update: {},
    });
  }

  public async getCountComplitedTasksInLesson(
    userId: number,
    lessonId: number,
  ): Promise<number> {
    return await this.db.grammarProgress.count({
      where: {
        userId,
        task: {
          lessonId,
        },
      },
    });
  }
}
