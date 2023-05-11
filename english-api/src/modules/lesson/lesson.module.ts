import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from 'src/database/database.module';

import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { LessonRepository } from './lesson.repository';
import { GrammarProgressModule } from '../grammar-progress/grammar-progress.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [LessonController],
  providers: [LessonService, LessonRepository],
  imports: [DatabaseModule, ConfigModule, GrammarProgressModule, UserModule],
  exports: [LessonService],
})
export class LessonModule {}
