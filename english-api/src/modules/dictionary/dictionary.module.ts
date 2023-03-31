import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { DictionaryRepository } from './dictionary.repository';

@Module({
  controllers: [DictionaryController],
  providers: [DictionaryService, DictionaryRepository],
  imports: [DatabaseModule, ConfigModule],
  exports: [DictionaryService],
})
export class DictionaryModule {}
