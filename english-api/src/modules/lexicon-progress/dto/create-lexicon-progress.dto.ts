import { ApiProperty } from '@nestjs/swagger';
import { LexiconProgress } from '@prisma/client';
import { IsBoolean, IsNumber } from 'class-validator';

type CreateLexiconProgressType = Pick<LexiconProgress, 'wordId'>;

export class CreateLexiconProgressDto implements CreateLexiconProgressType {
  @ApiProperty()
  @IsBoolean()
  isCorrectAnswer: boolean;

  @ApiProperty()
  @IsNumber()
  wordId: number;
}
