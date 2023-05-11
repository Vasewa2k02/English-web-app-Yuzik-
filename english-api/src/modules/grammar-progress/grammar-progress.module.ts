import { Module } from '@nestjs/common';
import { GrammarProgressService } from './grammar-progress.service';
import { GrammarProgressController } from './grammar-progress.controller';
import { GrammarProgressRepository } from './grammar-progress.repository';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [GrammarProgressController],
  providers: [GrammarProgressService, GrammarProgressRepository],
  imports: [DatabaseModule, ConfigModule],
  exports: [GrammarProgressService],
})
export class GrammarProgressModule {}
