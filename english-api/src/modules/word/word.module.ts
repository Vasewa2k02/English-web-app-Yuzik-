import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { WordRepository } from './word.repository';
import { DictionaryModule } from '../dictionary/dictionary.module';

@Module({
  controllers: [WordController],
  providers: [WordService, WordRepository],
  imports: [DatabaseModule, ConfigModule, DictionaryModule],
  exports: [WordService],
})
export class WordModule {}
