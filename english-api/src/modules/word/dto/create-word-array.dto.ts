import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateWordDto } from './create-word.dto';

export class CreateWordArrayDto {
  @ApiProperty({ type: [CreateWordDto] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateWordDto)
  wordArray: CreateWordDto[];
}
