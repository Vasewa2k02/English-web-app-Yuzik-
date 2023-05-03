import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class CreateWordDto {
  @ApiProperty()
  @Matches(/^[a-z-]{1,30}$/)
  englishSpelling: string;

  @ApiProperty()
  @Matches(/^.{1,50}$/)
  transcription: string;

  @ApiProperty()
  @Matches(/^[а-я-]{1,30}$/)
  russianSpelling: string;

  @ApiProperty()
  description: string | null;
}
