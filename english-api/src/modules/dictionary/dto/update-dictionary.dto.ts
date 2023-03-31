import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Matches } from 'class-validator';
import { CreateDictionaryDto } from './create-dictionary.dto';

export class UpdateDictionaryDto
  extends PartialType(CreateDictionaryDto)
  implements CreateDictionaryDto
{
  @ApiProperty()
  @Matches(/^.{2,30}$/)
  name: string;

  @ApiProperty()
  @Matches(/^.{2,200}$/)
  description: string;
}
