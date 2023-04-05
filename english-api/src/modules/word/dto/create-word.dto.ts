import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class CreateWordDto {
  @ApiProperty()
  @Matches(/^.{1,30}$/)
  englishSpelling: string;

  @ApiProperty()
  @Matches(/^.{1,50}$/)
  transcription: string;

  @ApiProperty()
  @Matches(/^.{1,30}$/)
  russianSpelling: string;

  @ApiProperty()
  description: string | null;
}
