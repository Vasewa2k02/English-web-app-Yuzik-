import { Injectable } from '@nestjs/common';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { StatisticsResponse } from './response/statistics.response';
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

  async getAllStatistics(): Promise<StatisticsResponse[]> {
    return await this.statisticsRepository.getAllStatistics();
  }

  async getUserAllStatistics(userId: number): Promise<StatisticsResponse> {
    return await this.statisticsRepository.getUserAllStatistics(userId);
  }

  async getUserTodayStatistics(userId: number): Promise<StatisticsResponse> {
    return await this.statisticsRepository.getUserTodayStatistics(userId);
  }
}
