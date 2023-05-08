import { ApiProperty } from '@nestjs/swagger';
import { Task } from '@prisma/client';
import { IsNumber, Matches } from 'class-validator';

type CreateTaskType = Pick<
  Task,
  'englishSentence' | 'russianSentence' | 'lessonId'
>;

export class CreateTaskDto implements CreateTaskType {
  @ApiProperty()
  @Matches(/^[a-zA-Z.,:;!?'`— ]{2,300}$/)
  englishSentence: string;

  @ApiProperty()
  @Matches(/^[а-яА-Я.,:;!?'`— ]{2,300}$/)
  russianSentence: string;

  @ApiProperty()
  @IsNumber()
  lessonId: number;
}
