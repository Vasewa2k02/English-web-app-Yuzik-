import { ApiProperty } from '@nestjs/swagger';
import { Dictionary } from '@prisma/client';
import { Matches } from 'class-validator';

type DictionaryCreateType = Pick<Dictionary, 'name' | 'description'>;

export class CreateDictionaryDto implements DictionaryCreateType {
  @ApiProperty()
  @Matches(/^.{2,30}$/)
  name: string;

  @ApiProperty()
  @Matches(/^.{2,200}$/)
  description: string;
}
