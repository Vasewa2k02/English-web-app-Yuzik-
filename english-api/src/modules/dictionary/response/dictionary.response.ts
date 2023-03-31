import { ApiProperty } from '@nestjs/swagger';
import { Dictionary } from '@prisma/client';
import { swaggerType } from 'src/helpers/swagger/utils';
import { WordResponse } from 'src/modules/word/response/word.response';

export class DictionaryResponse
  implements Pick<Dictionary, 'name' | 'description' | 'creatorId'>
{
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  creatorId: number;

  @ApiProperty(swaggerType(WordResponse))
  words: WordResponse[];
}
