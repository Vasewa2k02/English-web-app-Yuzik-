import { ApiProperty } from '@nestjs/swagger';
import { Dictionary } from '@prisma/client';

export class DictionaryForWordResponse implements Dictionary {
  @ApiProperty()
  creatorId: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
