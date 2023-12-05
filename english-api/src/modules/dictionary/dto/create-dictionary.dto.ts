import { ApiProperty } from '@nestjs/swagger';
import { Dictionary } from '@prisma/client';
import { Matches } from 'class-validator';

type DictionaryCreateType = Pick<Dictionary, 'name' | 'description'>;

export class CreateDictionaryDto implements DictionaryCreateType {
  @ApiProperty()
  description: string | null;
  @ApiProperty()
  @Matches(/^.{2,30}$/)
  name: string;
}
