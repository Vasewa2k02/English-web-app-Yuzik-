import { ApiProperty } from '@nestjs/swagger';
import { Dictionary } from '@prisma/client';
import { swaggerType } from 'src/helpers/swagger/utils';
import { WordReviewResponse } from 'src/modules/word/response/word-for-review.response';

export class DictionaryReviewResponse implements Dictionary {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  creatorId: number;

  @ApiProperty(swaggerType(WordReviewResponse))
  words: WordReviewResponse[];
}
