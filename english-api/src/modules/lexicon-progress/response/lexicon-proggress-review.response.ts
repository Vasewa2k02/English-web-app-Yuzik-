import { ApiProperty } from '@nestjs/swagger';
import { LexiconProgress } from '@prisma/client';

type LexiconProgressReviewType = Pick<
  LexiconProgress,
  'progressCount' | 'isLearned'
>;

export class LexiconProgressReviewResponse
  implements LexiconProgressReviewType
{
  @ApiProperty()
  progressCount: number;

  @ApiProperty()
  isLearned: boolean;
}
