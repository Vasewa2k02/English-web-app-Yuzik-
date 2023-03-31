import { Module } from '@nestjs/common';
import { GrammarProgressService } from './grammar-progress.service';
import { GrammarProgressController } from './grammar-progress.controller';

@Module({
  controllers: [GrammarProgressController],
  providers: [GrammarProgressService],
})
export class GrammarProgressModule {}
