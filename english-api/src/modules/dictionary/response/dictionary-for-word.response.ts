import { ApiProperty } from '@nestjs/swagger';
import { Dictionary } from '@prisma/client';

export class DictionaryForWordResponse implements Dictionary {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  creatorId: number;
}
