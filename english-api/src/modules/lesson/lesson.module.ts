import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from 'src/database/database.module';

import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { LessonRepository } from './lesson.repository';

@Module({
  controllers: [LessonController],
  providers: [LessonService, LessonRepository],
  imports: [DatabaseModule, ConfigModule],
  exports: [LessonService],
})
export class LessonModule {}
