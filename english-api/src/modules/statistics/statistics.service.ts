import { Injectable } from '@nestjs/common';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { StatisticsRepository } from './statistics.repository';

@Injectable()
export class StatisticsService {
  constructor(private readonly statisticsRepository: StatisticsRepository) {}

  async createOrUpdateStatistics(
    userId: number,
    createStatisticDto: CreateStatisticDto,
  ): Promise<void> {
    await this.statisticsRepository.createOrUpdateStatistics(
      userId,
      createStatisticDto,
    );
  }
}
