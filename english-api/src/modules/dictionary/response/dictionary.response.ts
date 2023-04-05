import { ApiProperty } from '@nestjs/swagger';
import { Dictionary } from '@prisma/client';
import { swaggerType } from 'src/helpers/swagger/utils';
import { WordForDictionaryResponse } from 'src/modules/word/response/word-for-dictionary.response';

export class DictionaryResponse implements Dictionary {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  creatorId: number;

  @ApiProperty(swaggerType(WordForDictionaryResponse))
  words: WordForDictionaryResponse[];
}
