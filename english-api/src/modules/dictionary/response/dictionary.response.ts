import { ApiProperty } from '@nestjs/swagger';
import { Dictionary } from '@prisma/client';
import { swaggerType } from 'src/helpers/swagger/utils';
import { WordForDictionaryResponse } from 'src/modules/word/response/word-for-dictionary.response';

export class DictionaryResponse implements Dictionary {
  @ApiProperty(swaggerType(WordForDictionaryResponse))
  words: WordForDictionaryResponse[];
  @ApiProperty()
  creatorId: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
