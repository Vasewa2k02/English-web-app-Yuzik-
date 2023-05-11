import { Module } from '@nestjs/common';
import { LexiconProgressService } from './lexicon-progress.service';
import { LexiconProgressController } from './lexicon-progress.controller';
import { LexiconProgressRepository } from './lexicon-progress.repository';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { StatisticsModule } from '../statistics/statistics.module';

@Module({
  controllers: [LexiconProgressController],
  providers: [LexiconProgressService, LexiconProgressRepository],
  imports: [DatabaseModule, ConfigModule, StatisticsModule],
  exports: [LexiconProgressService],
})
export class LexiconProgressModule {}
