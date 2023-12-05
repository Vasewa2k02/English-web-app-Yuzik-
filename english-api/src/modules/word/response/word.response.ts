import { ApiProperty } from '@nestjs/swagger';
import { Word } from '@prisma/client';
import { swaggerType } from 'src/helpers/swagger/utils';
import { DictionaryForWordResponse } from 'src/modules/dictionary/response/dictionary-for-word.response';

export class WordResponse implements Word {
  @ApiProperty()
  description: string;
  @ApiProperty()
  @ApiProperty(swaggerType(DictionaryForWordResponse))
  dictionaries: DictionaryForWordResponse[];
  @ApiProperty()
  englishSpelling: string;
  @ApiProperty()
  id: number;
  @ApiProperty()
  russianSpelling: string;
  @ApiProperty()
  transcription: string;
}
