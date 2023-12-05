import { ApiProperty } from '@nestjs/swagger';
import { LexiconProgressResponse } from 'src/modules/lexicon-progress/response/lexicon-progress.response';
import { WordForDictionaryResponse } from './word-for-dictionary.response';

export class WordReviewResponse implements WordForDictionaryResponse {
  @ApiProperty()
  lexiconProgress: LexiconProgressResponse;
  @ApiProperty()
  description: string;
  @ApiProperty()
  englishSpelling: string;
  @ApiProperty()
  id: number;
  @ApiProperty()
  russianSpelling: string;
  @ApiProperty()
  transcription: string;
}
