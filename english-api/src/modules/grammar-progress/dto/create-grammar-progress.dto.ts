import { ApiProperty } from '@nestjs/swagger';
import { GrammarProgress } from '@prisma/client';
import { IsNumber } from 'class-validator';

type GrammarProgressType = Pick<GrammarProgress, 'taskId'>;

export class CreateGrammarProgressDto implements GrammarProgressType {
  @ApiProperty()
  @IsNumber()
  taskId: number;
}
