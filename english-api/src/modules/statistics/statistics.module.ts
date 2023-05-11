import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { StatisticsRepository } from './statistics.repository';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService, StatisticsRepository],
  imports: [DatabaseModule, ConfigModule],
  exports: [StatisticsService],
})
export class StatisticsModule {}
