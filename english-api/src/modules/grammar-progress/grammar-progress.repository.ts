import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { GrammarProgressResponse } from './response/grammar-progress.response';

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

  public async getAllByUserId(
    userId: number,
  ): Promise<GrammarProgressResponse[]> {
    const res = await this.db.grammarProgress.findMany({
      where: {
        userId,
      },
      select: {
        taskId: true,
        task: {
          select: {
            lessonId: true,
          },
        },
      },
    });

    const grammarProgress = res.reduce((acc, curr) => {
      const existingItem = acc.find(
        (item) => item.lessonId === curr.task.lessonId,
      );

      if (existingItem) {
        existingItem.taskIds.push(curr.taskId);
      } else {
        acc.push({
          lessonId: curr.task.lessonId,
          taskIds: [curr.taskId],
        });
      }

      return acc;
    }, []);

    return grammarProgress;
  }
}
