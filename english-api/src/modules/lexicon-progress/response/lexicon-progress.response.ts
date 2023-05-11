import { ApiProperty } from '@nestjs/swagger';
import { LexiconProgress } from '@prisma/client';

type LexiconProgressType = Pick<
  LexiconProgress,
  'id' | 'progressCount' | 'isLearned' | 'wordId'
>;

export class LexiconProgressResponse implements LexiconProgressType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  progressCount: number;

  @ApiProperty()
  isLearned: boolean;

  @ApiProperty()
  wordId: number;
}
