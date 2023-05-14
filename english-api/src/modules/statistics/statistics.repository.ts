import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { StatisticsResponse } from './response/statistics.response';

@Injectable()
export class StatisticsRepository {
  constructor(private readonly db: DatabaseService) {}

  private lexiconProgressSelect = {
    id: true,
    progressCount: true,
    isLearned: true,
    wordId: true,
  };

  private statisticsSelect = {
    words: true,
    tasks: true,
    quizPoints: true,
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

  public async getAllStatistics(): Promise<any> {
    return await this.db
      .$queryRaw`SELECT users.id, name, cast(sum(words) as integer) words,
      cast(sum(tasks) as integer) tasks, cast(sum(quiz_points) as integer) quizPoints
      FROM public.statistics JOIN public.users on statistics.user_id = users.id
      GROUP by statistics.user_id, users.id, name`;
  }

  public async getUserAllStatistics(userId: number): Promise<any> {
    return await this.db
      .$queryRaw`SELECT users.id, name, cast(sum(words) as integer) words,
    cast(sum(tasks) as integer) tasks, cast(sum(quiz_points) as integer) quizPoints
    FROM public.statistics JOIN public.users on statistics.user_id = users.id
    WHERE statistics.user_id = ${userId}
    GROUP by statistics.user_id, users.id, name`;
  }

  public async getUserTodayStatistics(userId: number): Promise<any> {
    const todayISO = new Date().toISOString().substring(0, 10);

    return await this.db.statistics.findUnique({
      where: {
        date_userId: {
          date: new Date(todayISO),
          userId,
        },
      },
      select: this.statisticsSelect,
    });
  }
}
