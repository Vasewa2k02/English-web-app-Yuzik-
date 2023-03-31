import { Module } from '@nestjs/common';
import { LexiconProgressService } from './lexicon-progress.service';
import { LexiconProgressController } from './lexicon-progress.controller';

@Module({
  controllers: [LexiconProgressController],
  providers: [LexiconProgressService]
})
export class LexiconProgressModule {}
