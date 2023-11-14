import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { TopicRepository } from './topic.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [TopicController],
  providers: [TopicService, TopicRepository],
  imports: [DatabaseModule],
  exports: [TopicService],
})
export class TopicModule {}
