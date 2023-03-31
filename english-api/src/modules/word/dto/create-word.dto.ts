import { ApiProperty } from '@nestjs/swagger';
import { Word } from '@prisma/client';
import { Matches } from 'class-validator';

export class CreateWordDto implements Omit<Word, 'id' | 'description'> {
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
  @Matches(/^.{2,50}$/)
  description?: string;
}
