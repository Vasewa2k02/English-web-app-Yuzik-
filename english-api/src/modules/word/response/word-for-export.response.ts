import { ApiProperty } from '@nestjs/swagger';
import { Word } from '@prisma/client';

export type WordForExportResponse = Pick<
  Word,
  'englishSpelling' | 'transcription' | 'russianSpelling' | 'description'
>;

export class WordForDictionaryResponse implements WordForExportResponse {
  @ApiProperty()
  englishSpelling: string;

  @ApiProperty()
  transcription: string;

  @ApiProperty()
  russianSpelling: string;

  @ApiProperty()
  description: string;
}
