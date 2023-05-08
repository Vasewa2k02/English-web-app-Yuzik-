import { ApiProperty } from '@nestjs/swagger';
import { LexiconProgressReviewResponse } from 'src/modules/lexicon-progress/response/lexicon-proggress-review.response';
import { WordForDictionaryResponse } from './word-for-dictionary.response';

export class WordReviewResponse implements WordForDictionaryResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  englishSpelling: string;

  @ApiProperty()
  transcription: string;

  @ApiProperty()
  russianSpelling: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  lexiconProgress: LexiconProgressReviewResponse;
}
