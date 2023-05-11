import { Injectable } from '@nestjs/common';
import { LexiconProgress } from '@prisma/client';
import RequestWithUser from '../auth/interface/request-with-user.interface';
import { CreateStatisticDto } from '../statistics/dto/create-statistic.dto';
import { StatisticsService } from '../statistics/statistics.service';
import { CreateLexiconProgressDto } from './dto/create-lexicon-progress.dto';
import { LexiconProgressRepository } from './lexicon-progress.repository';
import { LexiconProgressResponse } from './response/lexicon-progress.response';

@Injectable()
export class LexiconProgressService {
  constructor(
    private readonly lexiconProgressRepository: LexiconProgressRepository,
    private readonly statisticsService: StatisticsService,
  ) {}

  async createOrUpdateLexiconProgress(
    req: RequestWithUser,
    createLexiconProgressDto: CreateLexiconProgressDto,
  ): Promise<LexiconProgressResponse> {
    const lexiconProgress =
      await this.lexiconProgressRepository.getLexiconProgress(
        req.user.id,
        createLexiconProgressDto.wordId,
      );

    const progressCount = createLexiconProgressDto.isCorrectAnswer
      ? lexiconProgress?.progressCount + 1 || 1
      : 0;

    const idLearned =
      progressCount >= req.user.settings.countRepeatWordForLearned;

    return await this.lexiconProgressRepository.createOrUpdateLexiconProgress(
      req.user.id,
      createLexiconProgressDto.wordId,
      progressCount,
      idLearned,
    );
  }
}
